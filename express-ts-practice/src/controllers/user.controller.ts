import { Request, Response } from 'express';
import { CustomerRequest } from '../middleware/auth.middleware';

export const getProfile = (req: CustomerRequest, res: Response) => {
  res.status(200).json({
    message: 'Procted Route Accessed',
    user: req.user,
  });
};
