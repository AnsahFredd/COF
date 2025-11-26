import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
  // Create an admin user
  const hashedPassword = await bcrypt.hash('cofuelevents@admin_7940$', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@cofuel.com' },
    update: {},
    create: {
      firstName: 'Cofuel',
      lastName: 'Events',
      email: 'admin@cofuelevents.com',
      password: hashedPassword,
      role: 'ADMIN',
      isEmailVerified: true,
    },
  });

  console.log('Seeded admin user:', admin.email);
}

seed()
  .catch((error) => {
    console.error('Seed error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
