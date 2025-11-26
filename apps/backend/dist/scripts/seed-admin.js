"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../config/database");
const client_1 = require("@prisma/client");
/**
 * Seed script to create an admin user
 * Run with: npx ts-node src/scripts/seed-admin.ts
 */
async function seedAdmin() {
    try {
        console.log('Seeding admin user...');
        const adminEmail = 'admin@cofuel.com';
        const adminPassword = 'cofuel@events7940';
        // Check if admin already exists
        const existingAdmin = await database_1.prisma.user.findUnique({
            where: { email: adminEmail },
        });
        if (existingAdmin) {
            console.log('Admin user already exists');
            console.log('Email:', adminEmail);
            return;
        }
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(adminPassword, 10);
        // Create admin user
        const admin = await database_1.prisma.user.create({
            data: {
                firstName: 'Admin',
                lastName: 'User',
                email: adminEmail,
                password: hashedPassword,
                role: client_1.Role.ADMIN,
                isEmailVerified: true,
            },
        });
        console.log('Admin user created successfully!');
        console.log('Email:', adminEmail);
        console.log('Password:', adminPassword);
        console.log('Role:', admin.role);
        console.log('\nPlease change the password after first login!');
    }
    catch (error) {
        console.error('Error seeding admin user:', error);
        throw error;
    }
    finally {
        await database_1.prisma.$disconnect();
    }
}
seedAdmin();
