import { Request, Response } from 'express';
import { prisma } from '../app';

const toProfileResponse = (profile: {
  id: string;
  username: string;
  fullName: string | null;
  avatarUrl: string | null;
  website: string | null;
  github: string | null;
  bio: string | null;
  createdAt: Date;
  updatedAt: Date;
}) => ({
  id: profile.id,
  username: profile.username,
  full_name: profile.fullName,
  avatar_url: profile.avatarUrl,
  website: profile.website,
  github: profile.github,
  bio: profile.bio,
  created_at: profile.createdAt,
  updated_at: profile.updatedAt,
});

const canAccessUser = (req: Request, userId: string) => req.user?.id === userId;

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!canAccessUser(req, userId)) {
      return res.status(403).json({ message: 'You can only access your own profile' });
    }

    const profile = await prisma.profile.findUnique({
      where: { id: userId },
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.status(200).json({ profile: toProfileResponse(profile) });
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { full_name, avatar_url, website, github, bio } = req.body;

    if (!canAccessUser(req, userId)) {
      return res.status(403).json({ message: 'You can only update your own profile' });
    }

    const profile = await prisma.profile.upsert({
      where: { id: userId },
      create: {
        id: userId,
        username: req.user?.id || userId,
        fullName: full_name,
        avatarUrl: avatar_url,
        website,
        github,
        bio,
      },
      update: {
        fullName: full_name,
        avatarUrl: avatar_url,
        website,
        github,
        bio,
      },
    });

    return res.status(200).json({ profile: toProfileResponse(profile) });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
