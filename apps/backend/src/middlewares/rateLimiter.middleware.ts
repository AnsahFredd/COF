import arcjet, { shield, detectBot, tokenBucket } from '@arcjet/node';
import { config } from 'src/config';
import { Request, Response, NextFunction } from 'express';

// Strict rate limiter for login/auth endpoints
const ajLogin = arcjet({
  key: config.arcjetKey,
  characteristics: ['ip.src'],
  rules: [
    // Block common attacks
    shield({ mode: 'LIVE' }),
    // Block all bots on login
    detectBot({
      mode: 'LIVE',
      allow: [],
    }),
    // Strict: 10 requests per 5 minutes
    tokenBucket({
      mode: 'LIVE',
      refillRate: 10,
      interval: 300,
      capacity: 10,
    }),
  ],
});

// Medium rate limiter for sensitive endpoints (payments, profile updates, etc.)
const ajSensitive = arcjet({
  key: config.arcjetKey,
  characteristics: ['ip.src'],
  rules: [
    shield({ mode: 'LIVE' }),
    detectBot({
      mode: 'LIVE',
      allow: [],
    }),
    // Medium: 20 requests per minute
    tokenBucket({
      mode: 'LIVE',
      refillRate: 20,
      interval: 60,
      capacity: 20,
    }),
  ],
});

// General API rate limiter
const ajApi = arcjet({
  key: config.arcjetKey,
  characteristics: ['ip.src'],
  rules: [
    shield({ mode: 'LIVE' }),
    detectBot({
      mode: 'LIVE',
      allow: ['GOOGLE_CRAWLER', 'BING_CRAWLER'],
    }),
    tokenBucket({
      mode: 'LIVE',
      refillRate: 100,
      interval: 60,
      capacity: 100,
    }),
  ],
});

// Helper function to create rate limiter middleware
const createRateLimiter = (ajInstance: typeof ajLogin, retryAfterSeconds: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
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
        } else if (decision.reason.isBot()) {
          return res.status(403).json({ error: 'Bot detected!' });
        } else {
          return res.status(403).json({ error: 'Access denied' });
        }
      }

      next();
    } catch (error) {
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
export const rateLimiterLogin = createRateLimiter(ajLogin, 300); // 5 minutes
export const rateLimiterSensitive = createRateLimiter(ajSensitive, 60); // 1 minute
export const rateLimiter = createRateLimiter(ajApi, 60); // 1 minute

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
