import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export interface CustomerRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

export const protect = (
  req: CustomerRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    //get token
    const token = req.headers.authorization;

    //Check Token
    if (!token) {
      return res.status(401).json({
        message: 'No Token Provided',
      });
    }

    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      return res.status(500).json({
        message: 'Server Error',
      });
    }
    //verfiy Token
    const decoded = jwt.verify(token, secretKey) as {
      id: number;
      email: string;
    };

    //attach user
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: 'Invalid Token',
    });
  }
};
