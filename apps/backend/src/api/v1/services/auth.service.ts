import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { prisma } from 'src/config/database';
import { config } from 'src/config';
import { AppError } from 'src/utils/AppError';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';

export const authService = {
  register: async (data: RegisterDto) => {
    const { firstName, lastName, email, password } = data;

    // 1. Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });

    return user;
  },

  login: async (data: LoginDto) => {
    const { email, password } = data;

    // 1. Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // 2. Validate password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new AppError('Invalid email or password', 401);
    }

    // 3. Generate access token (1 day)
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn || '1d' } as SignOptions
    );

    // 4. Generate refresh token (7 days)
    const refreshToken = jwt.sign(
      {
        id: user.id,
        type: 'refresh',
      },
      config.jwtSecret,
      { expiresIn: '7d' } as SignOptions
    );

    // 5. Store refresh token in database
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    // 6. Return safe user object + tokens
    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token,
      refreshToken,
    };
  },
};
