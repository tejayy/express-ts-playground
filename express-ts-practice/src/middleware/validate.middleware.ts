import { Request, Response, NextFunction } from 'express';

export const validateNote = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: 'Title and content are required',
    });
  }

  next();
};
