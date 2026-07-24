# Kenoye Portfolio

A modern portfolio website for Okagua Kenoye, built to showcase software engineering work, selected case studies, tutoring services, and long-form writing.

The site is a Vite + React application with TypeScript, Tailwind CSS, shadcn/ui components, Supabase integration, protected admin routes, and serverless functions for contact and sitemap workflows.

## Features

- Responsive portfolio landing page with hero, about, services, projects, experience, tutoring, and contact sections
- Filterable project showcase with featured case studies
- Blog listing, individual blog posts, and protected admin editing routes
- Supabase-backed authentication/data access
- Contact form powered by a Supabase Edge Function
- Light/dark theme support
- Unit test setup with Vitest and Testing Library

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui and Radix UI
- Framer Motion
- React Router
- TanStack Query
- Supabase
- Vitest

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/kenoyek/kenoye-portfolio.git
cd kenoye-portfolio
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Add the required Supabase values:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Start the development server:

```bash
npm run dev
```

The app will be available at the local URL printed by Vite, usually `http://localhost:5173`.

## Available Scripts

```bash
npm run dev       # Start the local development server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
npm run test      # Run the test suite
```

## Supabase

This project includes Supabase migrations and Edge Functions in the `supabase/` directory.

Client-side code expects:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

The Edge Functions may also require Supabase project secrets such as `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` when deployed through Supabase.

## Deployment

Build the app before deploying:

```bash
npm run build
```

Deploy the generated `dist/` directory to a static hosting provider such as Vercel, Netlify, Cloudflare Pages, or any host that supports Vite single-page applications. Configure the same environment variables in the hosting dashboard.

## License

All rights reserved.
