# Web Dev Tutorial App

A comprehensive web development tutorial application with a React frontend and Express + Prisma backend.

## Project Structure

The project is organized into two main parts:

1. **Frontend** (root directory)
   - React + TypeScript + Vite
   - Tailwind CSS for styling
   - React Router for navigation

2. **Backend** (`/server` directory)
   - Express.js REST API
   - Prisma ORM with PostgreSQL
   - JWT authentication

## Getting Started

### Prerequisites

- Node.js (v14+)
- PostgreSQL database

### Setting up the Backend

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with your PostgreSQL connection details and JWT secret:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/webdevtutorials?schema=public"
JWT_SECRET="your-secret-jwt-key"
JWT_EXPIRES_IN="7d"
PORT=5000
CLIENT_URL="http://localhost:5173"
```

4. Set up the database with Prisma:

```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Start the development server:

```bash
npm run dev
```

### Setting up the Frontend

1. From the root directory, install dependencies:

```bash
npm install
```

2. Create a `.env` file for your frontend:

```env
VITE_API_URL="http://localhost:5000/api"
```

3. Start the development server:

```bash
npm run dev
```

## Features

- User authentication (signup, login, profile management)
- Interactive tutorials on web development topics
- Progress tracking for users
- Dark mode support
- Responsive design

## Tech Stack

- **Frontend**:
  - React 18
  - TypeScript
  - Tailwind CSS
  - ShadcnUI components
  - React Router

- **Backend**:
  - Node.js
  - Express
  - Prisma ORM
  - PostgreSQL
  - JWT Authentication
