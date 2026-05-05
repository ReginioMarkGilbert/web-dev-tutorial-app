import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import authRoutes from './routes/auth';
import profilesRoutes from './routes/profiles';
import progressRoutes from './routes/progress';

dotenv.config();

export const prisma = new PrismaClient();
export const app = express();

const defaultOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://web-dev-tutorial-app.vercel.app',
];

const allowedOrigins = (process.env.CLIENT_URL || defaultOrigins.join(','))
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ''))) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
}));
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Web Dev Tutorial API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/profiles', profilesRoutes);
app.use('/api/progress', progressRoutes);
// app.use('/api/tutorials', tutorialsRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

export default app;
