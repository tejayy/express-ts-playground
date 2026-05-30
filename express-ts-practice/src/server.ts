import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';
import noteRoutes from './routes/note.route';
import adminRoutes from './routes/admin.route';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/note', noteRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('API Running Successfully');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
