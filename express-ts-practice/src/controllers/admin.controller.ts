import { Request, Response } from 'express';

import { prisma } from '../config/prisma';

import { asyncHandler } from '../utils/asyncHandler';

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  res.status(200).json({
    total: users.length,
    users,
  });
});
