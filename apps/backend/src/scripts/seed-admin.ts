import bcrypt from 'bcryptjs';
import { prisma } from '../config/database';
import { Role } from '@prisma/client';

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
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      console.log('Email:', adminEmail);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        firstName: 'Admin',
        lastName: 'User',
        email: adminEmail,
        password: hashedPassword,
        role: Role.ADMIN,
        isEmailVerified: true,
      },
    });

    console.log('Admin user created successfully!');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('Role:', admin.role);
    console.log('\nPlease change the password after first login!');
  } catch (error) {
    console.error('Error seeding admin user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
