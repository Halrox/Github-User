# GitHub User Search App

Searching GitHub users via the public GitHub API.

## Tech Stack

- React 19 with TypeScript
- Vite (build and dev server)
- Docker + Docker Compose
- CSS Modules
- React Testing Library + Jest
- Modular architecture following SOLID principles

## Project Structure

```
src/
├── assets/               # Static assets like logos and icons
├── components/           # Reusable UI components
├── css/
│   ├── components/       # Component-scoped CSS
│   ├── pages/            # Page-specific CSS
│   └── main/             # Global styles
├── hooks/                # Custom hooks: useSelection, useGitHubUsers
├── pages/                # Application pages: Home, UserGithub
├── test/                 # Unit tests
├── types/                # TypeScript type definitions
└── main.tsx              # Application entry point
```

## Running with Docker

### Prerequisites

- Docker
- Docker Compose

### Start in development mode:

```bash
docker-compose up
```

The application will be available at: http://localhost:3000

## Running tests

```bash
npm test
```

The tests use:

- @testing-library/react
- jest
- jest-dom
- Hook mocks for isolated logic testing

## Features

- Live search for GitHub users (`GET /search/users?q=`)
- Displays results as user cards
- Edit mode:
  - Multi-selection
  - Duplication (frontend only)
  - Deletion (frontend only)
- API error handling (`rate_limit`, `network`)
- Responsive layout
- Accessible
- Unit-tested components

## Best Practices

- Separation of concerns (SOLID)
- Strong typing using TypeScript in `types/`
- No unnecessary dependencies
- CSS organized by component and page
- Fully dockerized for consistent development