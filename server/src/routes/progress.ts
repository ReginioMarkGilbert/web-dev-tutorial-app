import express from 'express';
import { getAllProgress, getTutorialProgress, upsertTutorialProgress } from '../controllers/progressController';
import { protect } from '../middlewares/auth';

const router = express.Router();

router.use(protect);
router.get('/:userId', getAllProgress);
router.get('/:userId/tutorials/:tutorialId', getTutorialProgress);
router.post('/:userId/tutorials/:tutorialId', upsertTutorialProgress);
router.patch('/:userId/tutorials/:tutorialId', upsertTutorialProgress);

export default router;
