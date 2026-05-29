import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';

let notes: any[] = [];

export const createNote = asyncHandler(async (req: Request, res: Response) => {
  const { title, content } = req.body;

  if (title === 'error') {
    throw new Error('Manual test error');
  }

  const newNote = {
    id: Date.now(),
    title,
    content,
  };

  notes.push(newNote);

  res.status(201).json({
    message: 'Note created',
    note: newNote,
  });
});

export const getNotes = (req: Request, res: Response) => {
  res.status(200).json({
    total: notes.length,
    notes,
  });
};

export const getSingleNote = (req: Request, res: Response) => {
  const noteId = Number(req.params.id);

  const note = notes.find((note) => note.id === noteId);
  if (!note) {
    return res.status(404).json({
      message: 'Note not found',
    });
  }

  res.status(200).json(note);
};

export const updateNote = (req: Request, res: Response) => {
  const noteId = Number(req.params.id);

  const note = notes.find((note) => note.id === noteId);

  if (!note) {
    return res.status(404).json({
      message: 'Note not found',
    });
  }

  const { title, content } = req.body;

  note.title = title || note.title;
  note.content = content || note.content;

  res.status(200).json({
    message: 'Note updated',
    note,
  });
};

export const deleteNote = (req: Request, res: Response) => {
  const noteId = Number(req.params.id);

  const noteExists = notes.find((note) => note.id === noteId);

  if (!noteExists) {
    return res.status(404).json({
      message: 'Note not found',
    });
  }

  notes = notes.filter((note) => note.id !== noteId);

  res.status(200).json({
    message: 'Note Deleted',
  });
};
