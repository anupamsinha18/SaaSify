import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { BadRequestError } from '../utils/errors';

export const validate = (schema: ZodSchema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const message = (error as any).errors.map((e: any) => `${e.path.join('.')}: ${e.message}`).join(', ');
        next(new BadRequestError(message));
      } else {
        next(error);
      }
    }
  };
};
