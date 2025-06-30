import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 5000;

// Initialize Prisma client
export const prisma = new PrismaClient();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
	origin: process.env.CLIENT_URL || 'http://localhost:5174',
	credentials: true,
}));
app.use(express.json()); // Parse JSON bodies

// Basic route
app.get('/api', (req, res) => {
	res.json({ message: 'Welcome to the Web Dev Tutorial API' });
});

// Import routes
import authRoutes from './routes/auth';
app.use('/api/auth', authRoutes);
// app.use('/api/profiles', profilesRoutes);
// app.use('/api/progress', progressRoutes);
// app.use('/api/tutorials', tutorialsRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
	console.error(err.stack);
	res.status(err.statusCode || 500).json({
		message: err.message || 'Internal Server Error',
	});
});

// Start server
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
	console.error('Unhandled Rejection at:', promise, 'reason:', reason);
	// Close server & exit process
	process.exit(1);
});