import express from 'express';

import { getAllUsers } from '../controllers/admin.controller';

import { protect } from '../middleware/auth.middleware';

import { adminOnly } from '../middleware/admin.middleware';

const router = express.Router();

router.get('/users', protect, adminOnly, getAllUsers);

export default router;
