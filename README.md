# Web3 Tutorial App

A comprehensive platform for learning web3 development fundamentals with a focus on frontend technologies.

## Features

- Modern UI built with React, TypeScript, and Tailwind CSS
- Authentication with Supabase
- Dark/light mode theming
- Responsive design
- Interactive tutorials for web3 development

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Supabase account (for authentication)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/web3-tutorial-app.git
   cd web3-tutorial-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

## Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the Authentication section and enable Email auth provider
3. Configure password requirements in Authentication > Providers > Email
4. Copy your project URL and anon key from Project Settings > API
5. Paste these values in your `.env` file

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Authentication**: Supabase
- **Routing**: React Router
