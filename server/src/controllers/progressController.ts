import { Request, Response } from 'express';
import { prisma } from '../app';

const toProgressResponse = (progress: {
  id: string;
  userId: string;
  tutorialId: string;
  completed: boolean;
  progress: number;
  lastAccessed: Date;
  createdAt: Date;
  updatedAt: Date;
}) => ({
  id: progress.id,
  user_id: progress.userId,
  tutorial_id: progress.tutorialId,
  completed: progress.completed,
  progress: progress.progress,
  last_accessed: progress.lastAccessed,
  created_at: progress.createdAt,
  updated_at: progress.updatedAt,
});

const canAccessUser = (req: Request, userId: string) => req.user?.id === userId;

export const getAllProgress = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!canAccessUser(req, userId)) {
      return res.status(403).json({ message: 'You can only access your own progress' });
    }

    const progress = await prisma.userProgress.findMany({
      where: { userId },
      orderBy: { lastAccessed: 'desc' },
    });

    return res.status(200).json({ progress: progress.map(toProgressResponse) });
  } catch (error) {
    console.error('Get all progress error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTutorialProgress = async (req: Request, res: Response) => {
  try {
    const { userId, tutorialId } = req.params;

    if (!canAccessUser(req, userId)) {
      return res.status(403).json({ message: 'You can only access your own progress' });
    }

    const progress = await prisma.userProgress.findUnique({
      where: {
        userId_tutorialId: {
          userId,
          tutorialId,
        },
      },
    });

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    return res.status(200).json({ progress: toProgressResponse(progress) });
  } catch (error) {
    console.error('Get tutorial progress error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const upsertTutorialProgress = async (req: Request, res: Response) => {
  try {
    const { userId, tutorialId } = req.params;
    const requestedProgress = Number(req.body.progress ?? 0);
    const completed = Boolean(req.body.completed);
    const boundedProgress = Math.max(0, Math.min(100, Math.round(requestedProgress)));

    if (!canAccessUser(req, userId)) {
      return res.status(403).json({ message: 'You can only update your own progress' });
    }

    const progress = await prisma.userProgress.upsert({
      where: {
        userId_tutorialId: {
          userId,
          tutorialId,
        },
      },
      create: {
        userId,
        tutorialId,
        completed,
        progress: completed ? 100 : boundedProgress,
        lastAccessed: new Date(req.body.last_accessed || Date.now()),
      },
      update: {
        completed,
        progress: completed ? 100 : boundedProgress,
        lastAccessed: new Date(req.body.last_accessed || Date.now()),
      },
    });

    return res.status(200).json({ progress: toProgressResponse(progress) });
  } catch (error) {
    console.error('Upsert tutorial progress error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
