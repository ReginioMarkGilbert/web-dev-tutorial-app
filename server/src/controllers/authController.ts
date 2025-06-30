import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../index';

export const signup = async (req: Request, res: Response) => {
  try
  {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser)
    {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        profile: {
          create: {
            username: email,
          },
        },
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        profile: true,
      },
    });

    // Generate a JSON Web Token (JWT) for user authentication
    // JWTs are used to securely transmit information between parties as a JSON object

    // jwt.sign() creates a new token with 3 parameters:
    // 1. Payload: Contains user data (in this case the user ID)
    // 2. Secret key: Used to sign the token (from environment variables)
    // 3. Options object: Contains algorithm and other settings
    const token = jwt.sign(
      // Payload - only include non-sensitive data
      { id: user.id }, // User ID is safe to include

      // Secret key - MUST be kept secure and loaded from environment variables
      // Convert to string to ensure type safety
      String(process.env.JWT_SECRET),

      // Options object
      {
        algorithm: 'HS256' // HMAC-SHA256 signing algorithm - industry standard
        // Note: Consider adding:
        // - expiresIn: To limit token lifetime
        // - audience: To specify intended recipients
        // - issuer: To specify token creator
      }
    );

    return res.status(201).json({
      user,
      token,
    });
  } catch (error)
  {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const signin = async (req: Request, res: Response) => {
  try
  {
    const { email, password } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
      },
    });

    if (!user)
    {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
    {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id },
      String(process.env.JWT_SECRET),
      {
        algorithm: 'HS256'
      }
    );

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      user: userWithoutPassword,
      token,
    });
  } catch (error)
  {
    console.error('Signin error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try
  {
    // The user ID should be attached to the request by the auth middleware
    const userId = req.user?.id;

    if (!userId)
    {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
      },
    });

    if (!user)
    {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error)
  {
    console.error('Get me error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};