# TSM Welfare - Frontend

A modern, responsive web application for TSM Welfare built with Next.js 15, React 18, TypeScript, and Tailwind CSS.

## Features

- **Public Site**: Modern responsive design, donation processing, zakat calculator, volunteer application, events calendar, and media gallery.
- **Admin Dashboard**: Secure admin management for applications, donations, events, media, team members, volunteers, and newsletter subscribers.
- **Backend API Integration**: Connects to the TSM Welfare Backend service via Next.js proxy rewrites.

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State & Data Fetching**: SWR, React Hook Form
- **Authentication**: JWT verification via Jose (middleware)

## Getting Started

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Configure `BACKEND_URL` (defaults to `http://localhost:4000`) and `JWT_SECRET`.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.
