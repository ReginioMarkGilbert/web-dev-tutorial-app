import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController';
import { protect } from '../middlewares/auth';

const router = express.Router();

router.use(protect);
router.get('/:userId', getProfile);
router.patch('/:userId', updateProfile);

export default router;
