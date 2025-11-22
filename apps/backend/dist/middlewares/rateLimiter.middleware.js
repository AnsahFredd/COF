"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = exports.rateLimiterSensitive = exports.rateLimiterLogin = void 0;
const node_1 = __importStar(require("@arcjet/node"));
const config_1 = require("src/config");
// Strict rate limiter for login/auth endpoints
const ajLogin = (0, node_1.default)({
    key: config_1.config.arcjetKey,
    characteristics: ['ip.src'],
    rules: [
        // Block common attacks
        (0, node_1.shield)({ mode: 'LIVE' }),
        // Block all bots on login
        (0, node_1.detectBot)({
            mode: 'LIVE',
            allow: [],
        }),
        // Strict: 10 requests per 5 minutes
        (0, node_1.tokenBucket)({
            mode: 'LIVE',
            refillRate: 10,
            interval: 300,
            capacity: 10,
        }),
    ],
});
// Medium rate limiter for sensitive endpoints (payments, profile updates, etc.)
const ajSensitive = (0, node_1.default)({
    key: config_1.config.arcjetKey,
    characteristics: ['ip.src'],
    rules: [
        (0, node_1.shield)({ mode: 'LIVE' }),
        (0, node_1.detectBot)({
            mode: 'LIVE',
            allow: [],
        }),
        // Medium: 20 requests per minute
        (0, node_1.tokenBucket)({
            mode: 'LIVE',
            refillRate: 20,
            interval: 60,
            capacity: 20,
        }),
    ],
});
// General API rate limiter
const ajApi = (0, node_1.default)({
    key: config_1.config.arcjetKey,
    characteristics: ['ip.src'],
    rules: [
        (0, node_1.shield)({ mode: 'LIVE' }),
        (0, node_1.detectBot)({
            mode: 'LIVE',
            allow: ['GOOGLE_CRAWLER', 'BING_CRAWLER'],
        }),
        (0, node_1.tokenBucket)({
            mode: 'LIVE',
            refillRate: 100,
            interval: 60,
            capacity: 100,
        }),
    ],
});
// Helper function to create rate limiter middleware
const createRateLimiter = (ajInstance, retryAfterSeconds) => {
    return async (req, res, next) => {
        try {
            const decision = await ajInstance.protect(req, { requested: 1 });
            if (decision.isDenied()) {
                // Log blocked requests for monitoring
                console.warn('Arcjet blocked request', {
                    ip: req.ip,
                    path: req.path,
                    method: req.method,
                    reason: decision.reason.type,
                    timestamp: new Date().toISOString(),
                });
                // Optional: Track metrics if you have a monitoring solution
                // metrics.increment('arcjet.request.denied', { reason: decision.reason.type, path: req.path });
                if (decision.reason.isRateLimit()) {
                    return res.status(429).json({
                        error: 'Too many attempts!',
                        retryAfter: retryAfterSeconds,
                    });
                }
                else if (decision.reason.isBot()) {
                    return res.status(403).json({ error: 'Bot detected!' });
                }
                else {
                    return res.status(403).json({ error: 'Access denied' });
                }
            }
            next();
        }
        catch (error) {
            // Fail open (allow request) if Arcjet errors
            console.error('Arcjet error - failing open', {
                error: error instanceof Error ? error.message : String(error),
                path: req.path,
                method: req.method,
                ip: req.ip,
                timestamp: new Date().toISOString(),
            });
            next();
        }
    };
};
// Export rate limiters for different use cases
exports.rateLimiterLogin = createRateLimiter(ajLogin, 300); // 5 minutes
exports.rateLimiterSensitive = createRateLimiter(ajSensitive, 60); // 1 minute
exports.rateLimiter = createRateLimiter(ajApi, 60); // 1 minute
// Usage examples:
// Login/Auth endpoints (strictest)
// app.post('/auth/login', rateLimiterLogin);
// app.post('/auth/register', rateLimiterLogin);
// app.post('/auth/reset-password', rateLimiterLogin);
// Sensitive endpoints (medium)
// app.use('/payments', rateLimiterSensitive);
// app.put('/profile', rateLimiterSensitive);
// app.post('/api/admin', rateLimiterSensitive);
// General API endpoints (lenient)
// app.use('/api', rateLimiter);
