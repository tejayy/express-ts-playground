import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { prisma } from '../config/prisma';
import { asyncHandler } from '../utils/asyncHandler';

dotenv.config();

const users: any[] = [];

export const signup = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // check existing user
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    //hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: 'Signup Successful',
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //find user
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid Credentials',
      });
    }

    // generate token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1d',
      },
    );

    res.status(200).json({
      message: 'Login Successfull',
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
  }
});
