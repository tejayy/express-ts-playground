import express from 'express';
import {
  createNote,
  getNotes,
  getSingleNote,
  updateNote,
  deleteNote,
} from '../controllers/note.controller';
import { validateNote } from '../middleware/validate.middleware';

const router = express.Router();

router.post('/', validateNote, createNote);
router.get('/', getNotes);
router.get('/:id', getSingleNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
