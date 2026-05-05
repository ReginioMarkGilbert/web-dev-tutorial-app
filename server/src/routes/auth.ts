import express from 'express';
import { deleteMe, getMe, signin, signup } from '../controllers/authController';
import { protect } from '../middlewares/auth';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/signin', signin);

// Protected routes
router.get('/me', protect, getMe);
router.delete('/me', protect, deleteMe);

export default router;
