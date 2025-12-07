# GrowEase API

NestJS backend with GraphQL and REST endpoints.

## Development

```bash
# Install dependencies (from root)
pnpm install

# Run in development mode
pnpm dev:api

# Or from this directory
pnpm dev
```

## Endpoints

- **GraphQL**: http://localhost:3001/graphql
- **REST API Docs**: http://localhost:3001/api-docs
- **Health Check (REST)**: http://localhost:3001/api/health
- **Health Check (GraphQL)**: Query `health` in GraphQL playground

## Configuration

Configuration is loaded from `.env` files. See root `.env.example` for available variables.

### Secret Management

For staging/production, the config system can be extended to use a secret manager:

1. Create a `SecretManagerService` that implements secret fetching
2. Inject it into `ConfigModule` configuration
3. Override `ConfigService` to prioritize secrets from the manager

See `src/config/` (to be created) for extension points.

