# TSM Welfare Website

A modern, responsive website for TSM Welfare built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Modern UI with responsive design
- Form handling with validation
- Email notifications
- Volunteer management
- Donation processing
- Media gallery
- Admin dashboard
- Accessibility compliance
- SEO optimization

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Form Handling**: Custom form hook
- **Email**: Nodemailer
- **State Management**: React Context
- **Validation**: Custom validation with TypeScript
- **Testing**: Jest & React Testing Library
- **Linting**: ESLint & Prettier
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/                # Next.js app directory
│   ├── api/           # API routes
│   ├── (routes)/      # Page routes
│   └── layout.tsx     # Root layout
├── components/        # Reusable components
│   ├── ui/           # UI components
│   └── forms/        # Form components
├── lib/              # Utilities and services
│   ├── api/          # API client
│   ├── constants/    # Constants and config
│   └── services/     # Core services
├── hooks/            # Custom React hooks
├── styles/           # Global styles
└── types/            # TypeScript types
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/tsmwelfare.git
   cd tsmwelfare
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Fill in the required environment variables:
   ```
   NEXT_PUBLIC_API_URL=
   EMAIL_HOST=
   EMAIL_PORT=
   EMAIL_USER=
   EMAIL_PASS=
   EMAIL_FROM=
   EMAIL_SECURE=
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Write JSDoc comments for complex functions
- Keep components small and focused
- Use proper error handling and logging

### Component Guidelines

- Use functional components with hooks
- Implement proper prop types
- Keep components pure when possible
- Use proper error boundaries
- Implement loading states
- Handle edge cases

### Form Handling

- Use the custom `useForm` hook for forms
- Implement proper validation
- Show clear error messages
- Handle loading and success states
- Implement proper ARIA attributes

### API Guidelines

- Use the centralized API client
- Implement proper error handling
- Use TypeScript interfaces for requests/responses
- Log errors appropriately
- Handle loading and error states

### Testing

- Write unit tests for utilities and hooks
- Write integration tests for components
- Write E2E tests for critical flows
- Test error cases and edge cases
- Test accessibility

## Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Update documentation
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
