import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../index';

// Extend the Request type to include a user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try
  {
    let token;

    // Check for token in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    )
    {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token)
    {
      return res.status(401).json({
        message: 'Not authenticated',
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'fallback-secret'
    ) as { id: string; iat: number; exp: number };

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user)
    {
      return res.status(401).json({
        message: 'User belonging to this token no longer exists',
      });
    }

    // Attach user to request
    req.user = { id: user.id };
    next();
  } catch (error)
  {
    return res.status(401).json({
      message: 'Not authenticated',
    });
  }
};