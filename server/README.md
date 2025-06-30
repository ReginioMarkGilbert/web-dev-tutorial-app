# Web Dev Tutorial API

This is the REST API server for the Web Dev Tutorial App, built with Express, Prisma, and PostgreSQL.

## Prerequisites

- Node.js (v14+)
- PostgreSQL database

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file based on the following template:

```env
# Database connection
DATABASE_URL="postgresql://postgres:password@localhost:5432/webdevtutorials?schema=public"

# JWT Secret for authentication
JWT_SECRET="super-secret-jwt-token-that-should-be-changed-in-production"
JWT_EXPIRES_IN="7d"

# Server port
PORT=5000

# Allow CORS from client
CLIENT_URL="http://localhost:5173"
```

3. Set up the database with Prisma:

```bash
# Generate the Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# (Optional) Explore your database with Prisma Studio
npm run prisma:studio
```

4. Start the development server:

```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/signin` - Login to an existing account
- `GET /api/auth/me` - Get the current user's information

### Profiles

- `GET /api/profiles/:userId` - Get a user's profile
- `PATCH /api/profiles/:userId` - Update a user's profile

### Progress

- `GET /api/progress/:userId` - Get all progress for a user
- `GET /api/progress/:userId/tutorials/:tutorialId` - Get progress for a specific tutorial
- `POST /api/progress/:userId/tutorials/:tutorialId` - Create progress for a tutorial
- `PATCH /api/progress/:userId/tutorials/:tutorialId` - Update progress for a tutorial

### Tutorials

- `GET /api/tutorials` - Get all tutorials
- `GET /api/tutorials/:id` - Get a specific tutorial
- `POST /api/tutorials` - Create a new tutorial (admin only)
- `PATCH /api/tutorials/:id` - Update a tutorial (admin only)
- `DELETE /api/tutorials/:id` - Delete a tutorial (admin only)

## Project Structure

- `/prisma` - Prisma schema and migrations
- `/src`
  - `/controllers` - Request handlers
  - `/middlewares` - Express middlewares (auth, validation, etc.)
  - `/routes` - API routes
  - `/services` - Business logic
  - `/utils` - Utility functions
  - `index.ts` - Main application entry point