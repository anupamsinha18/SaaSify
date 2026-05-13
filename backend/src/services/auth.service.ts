import bcrypt from 'bcryptjs';
import prisma from '../config/db';
import { BadRequestError, UnauthorizedError } from '../utils/errors';
import { signToken } from '../utils/jwt';

export const signupUser = async (data: any) => {
  const { email, password, name, role } = data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new BadRequestError('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: role || 'MEMBER',
    },
  });

  const token = signToken({ id: user.id });

  return { user, token };
};

export const loginUser = async (data: any) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const token = signToken({ id: user.id });

  return { user, token };
};
