# GrowEase Monorepo

A scalable, full-stack TypeScript monorepo for the GrowEase SaaS platform.

## 🏗️ Architecture

This monorepo uses **Turborepo** with **pnpm** workspaces and includes:

- **Backend**: NestJS with GraphQL (code-first) and REST APIs
- **Frontend**: Next.js 14 (App Router) with TailwindCSS
- **Database**: MongoDB with Prisma ODM
- **Shared Packages**: Design tokens, types, config, and database client

### Directory Structure

```
GrowEase/
├── apps/
│   ├── api/          # NestJS backend (GraphQL + REST)
│   └── web/          # Next.js frontend
├── packages/
│   ├── config/       # Shared ESLint, Prettier, TypeScript configs
│   ├── db/           # Prisma client and database utilities
│   ├── design/       # Design tokens and Tailwind config
│   └── types/        # Shared TypeScript types
├── turbo.json        # Turborepo pipeline configuration
├── pnpm-workspace.yaml
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0
- **MongoDB**: Running locally or connection string

### Installation

```bash
# Install all dependencies
pnpm install

# Generate Prisma client
pnpm --filter @growease/db prisma:generate
```

### Environment Setup

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Update `.env` with your configuration:

```env
MONGODB_URI=mongodb://localhost:27017/growease
PORT_API=3001
PORT_WEB=3000
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Database Setup

```bash
# Generate Prisma client (if not already done)
pnpm --filter @growease/db prisma:generate

# Run migrations (creates initial schema)
pnpm --filter @growease/db prisma:migrate

# Optional: Open Prisma Studio to view data
pnpm --filter @growease/db prisma:studio
```

### Running Development Servers

```bash
# Run both frontend and backend
pnpm dev

# Run only frontend
pnpm dev:web

# Run only backend
pnpm dev:api
```

The applications will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **GraphQL Playground**: http://localhost:3001/graphql
- **Swagger Docs**: http://localhost:3001/api-docs

## 📜 Available Scripts

### Root Level

- `pnpm install` - Install all dependencies
- `pnpm dev` - Start all apps in development mode
- `pnpm dev:web` - Start only the frontend
- `pnpm dev:api` - Start only the backend
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Lint all packages
- `pnpm test` - Run all tests
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - Type check all packages

### Package-Specific

Each package/app has its own scripts. Use `pnpm --filter <package-name> <script>`:

```bash
# Example: Run lint for a specific package
pnpm --filter @growease/api lint

# Example: Build database package
pnpm --filter @growease/db build
```

## 🌐 Ngrok Setup (for Webhooks/External Callbacks)

For local development with webhooks or external API callbacks:

1. Install ngrok: https://ngrok.com/download

2. Start your API server:
```bash
pnpm dev:api
```

3. In a new terminal, expose the API:
```bash
ngrok http 3001
```

4. Use the provided ngrok URL (e.g., `https://abc123.ngrok.io`) for webhook configurations.

5. Optionally, configure ngrok with an auth token:
```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

**Note**: In production, use proper domain names and SSL certificates instead of ngrok.

## 🔐 Secret Management

### Development

For local development, use `.env` files. Never commit actual secrets to version control.

### Staging/Production

The configuration system is designed to be extended with secret managers:

#### Architecture

The NestJS `ConfigModule` uses `@nestjs/config` which can be extended to fetch secrets from:

- **AWS Secrets Manager**
- **HashiCorp Vault**
- **Doppler**
- **Azure Key Vault**
- Or any custom secret provider

#### Implementation Example (TODO)

Create a `SecretManagerService` that fetches secrets and injects them into the config:

```typescript
// apps/api/src/config/secret-manager.service.ts
@Injectable()
export class SecretManagerService {
  async getSecrets(): Promise<Record<string, string>> {
    // Fetch from your secret manager
    // Return as key-value pairs
  }
}
```

Then modify `AppModule` to use secrets from the manager when available:

```typescript
ConfigModule.forRootAsync({
  imports: [SecretManagerModule],
  inject: [SecretManagerService],
  useFactory: async (secretManager: SecretManagerService) => {
    const secrets = await secretManager.getSecrets();
    return {
      // Merge env vars with secrets (secrets take precedence)
      ...process.env,
      ...secrets,
    };
  },
})
```

See `apps/api/src/config/` for future extension points.

## 📚 API Documentation

### GraphQL

- **Playground**: http://localhost:3001/graphql (development only)
- **Schema**: Auto-generated at `apps/api/src/schema.gql`
- **Code-First**: All types and resolvers are defined in TypeScript

### REST (Swagger/OpenAPI)

- **Swagger UI**: http://localhost:3001/api-docs
- All REST endpoints must be documented using NestJS Swagger decorators

### Frontend API Docs

- Internal documentation: http://localhost:3000/dev/api-docs

## 🎨 Design System

Design tokens are centralized in `packages/design`:

- **Colors**: Primary, neutral, semantic (success, error, warning, info)
- **Spacing**: Consistent spacing scale
- **Typography**: Font families, sizes, weights
- **Shadows**: Elevation system
- **Radii**: Border radius scale

The frontend uses TailwindCSS with these tokens. See `packages/design/src/tokens.ts` for the full token list.

## 🧩 Development Guidelines

### Adding New Features

Every new feature should include:

1. **Backend Implementation**
   - GraphQL resolvers/types OR REST controllers
   - Business logic in services
   - Database models (if needed)
   - Swagger documentation (for REST endpoints)

2. **Frontend Implementation**
   - UI components using design tokens
   - Loading states
   - Error states
   - Empty states
   - User-friendly microcopy

3. **Documentation**
   - Update GraphQL schema (auto-generated)
   - Update Swagger docs (for REST)
   - Update frontend API docs (if needed)

### Code Quality

- **TypeScript**: Strict mode enabled, no `any` types
- **Linting**: ESLint with shared config from `@growease/config`
- **Formatting**: Prettier with consistent config
- **Testing**: Write tests for critical business logic

### UX Philosophy

- Always handle loading, error, and empty states
- Provide clear feedback to users
- Use friendly, helpful microcopy
- Follow design tokens for consistency
- Ensure accessibility

## 📦 Packages Overview

### `@growease/config`

Shared configuration for:
- ESLint rules
- Prettier formatting
- Base TypeScript config

### `@growease/types`

Shared TypeScript types:
- Base entities
- API response types
- Health status types
- Pagination types

### `@growease/design`

Design system:
- Design tokens (colors, spacing, typography, etc.)
- Theme configuration
- Tailwind config helpers

### `@growease/db`

Database layer:
- Prisma client singleton
- Connection utilities
- Database models

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests for a specific package
pnpm --filter @growease/api test

# Run tests in watch mode
pnpm --filter @growease/api test:watch
```

## 🏭 Production Build

```bash
# Build all packages and apps
pnpm build

# Build specific app
pnpm --filter @growease/web build
pnpm --filter @growease/api build
```

## 🤝 Contributing

1. Follow the established architecture and patterns
2. Write tests for new features
3. Update documentation
4. Ensure all linting and type checks pass
5. Handle all UX states (loading, error, empty)

## 📝 License

Private - All rights reserved

