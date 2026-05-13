import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, token } = await authService.signupUser(req.body);
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      status: 'success',
      data: {
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        token
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, token } = await authService.loginUser(req.body);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        token
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie('token', 'loggedout', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    expires: new Date(Date.now() + 10 * 1000),
  });
  res.status(200).json({ status: 'success' });
};

export const getMe = async (req: any, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      status: 'success',
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    next(error);
  }
};
