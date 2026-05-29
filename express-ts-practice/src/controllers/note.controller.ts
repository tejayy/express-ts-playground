import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { prisma } from '../config/prisma';
import { CustomerRequest } from '../middleware/auth.middleware';

let notes: any[] = [];

export const createNote = asyncHandler(
  async (req: CustomerRequest, res: Response) => {
    const { title, content } = req.body;

    if (title === 'error') {
      throw new Error('Manual test error');
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId: req.user!.id,
      },
    });

    res.status(201).json({
      message: 'Note created',
      note,
    });
  },
);

export const getNotes = asyncHandler(
  async (req: CustomerRequest, res: Response) => {
    const notes = await prisma.note.findMany({
      where: {
        userId: req.user!.id,
      },
    });

    res.status(200).json({
      total: notes.length,
      notes,
    });
  },
);

export const getSingleNote = asyncHandler(
  async (req: Request, res: Response) => {
    const noteId = Number(req.params.id);

    const note = await prisma.note.findUnique({
      where: {
        id: noteId,
      },
    });
    if (!note) {
      return res.status(404).json({
        message: 'Note not found',
      });
    }

    res.status(200).json(note);
  },
);

export const updateNote = asyncHandler(async (req: Request, res: Response) => {
  const noteId = Number(req.params.id);

  const { title, content } = req.body;

  const note = await prisma.note.update({
    where: {
      id: noteId,
    },
    data: {
      title,
      content,
    },
  });

  if (!note) {
    return res.status(404).json({
      message: 'Note not found',
    });
  }

  res.status(200).json({
    message: 'Note updated',
    note,
  });
});

export const deleteNote = asyncHandler(async (req: Request, res: Response) => {
  const noteId = Number(req.params.id);

  const noteExists = await prisma.note.delete({
    where: {
      id: noteId,
    },
  });

  if (!noteExists) {
    return res.status(404).json({
      message: 'Note not found',
    });
  }

  res.status(200).json({
    message: 'Note Deleted',
  });
});
