import express from 'express';
import {
  createNote,
  getNotes,
  getSingleNote,
  updateNote,
  deleteNote,
} from '../controllers/note.controller';
import { validateNote } from '../middleware/validate.middleware';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', protect, validateNote, createNote);
router.get('/', protect, getNotes);
router.get('/:id', protect, getSingleNote);
router.put('/:id', protect, updateNote);
router.delete('/:id', protect, deleteNote);

export default router;
