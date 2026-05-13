import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError, ForbiddenError } from '../utils/errors';
import { verifyToken } from '../utils/jwt';
import prisma from '../config/db';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const authenticateUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return next(new UnauthorizedError('Not logged in'));
    }

    const decoded = verifyToken<{ id: string }>(token);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return next(new UnauthorizedError('User no longer exists'));
    }

    req.user = { id: user.id, role: user.role };
    next();
  } catch (error) {
    next(new UnauthorizedError('Invalid token or expired'));
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ForbiddenError('You do not have permission to perform this action'));
    }
    next();
  };
};
