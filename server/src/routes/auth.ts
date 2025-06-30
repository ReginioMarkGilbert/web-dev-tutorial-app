import express from 'express';
import { getMe, signin, signup } from '../controllers/authController';
import { protect } from '../middlewares/auth';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/signin', signin);

// Protected routes
router.get('/me', protect, getMe);

export default router;