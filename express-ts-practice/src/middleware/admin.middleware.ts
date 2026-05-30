import { Response, NextFunction } from 'express';
import { CustomerRequest } from '../middleware/auth.middleware';

export const adminOnly = (
  req: CustomerRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({
      message: 'Access denied. Admins only.',
    });
  }

  next();
};
