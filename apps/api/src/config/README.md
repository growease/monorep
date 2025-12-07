# Configuration & Secret Management

## Overview

This directory contains configuration management for the NestJS API. Currently, configuration is loaded from `.env` files using `@nestjs/config`.

## Development

Configuration is loaded from `.env` files in the following order:
1. `.env.local` (highest priority)
2. `.env`

## Staging/Production

For staging and production environments, you can extend the configuration to use a secret manager.

### Extension Points

1. **Secret Manager Service**: Create a service that fetches secrets from your provider (AWS Secrets Manager, Doppler, Vault, etc.)

2. **Config Module**: Modify `AppModule` to load secrets from the manager

### Example Implementation

See `apps/api/src/app.module.ts` for the current `ConfigModule` setup. To add secret manager support:

```typescript
// Create: apps/api/src/config/secret-manager.service.ts
@Injectable()
export class SecretManagerService {
  async getSecrets(): Promise<Record<string, string>> {
    // Implement your secret fetching logic
    // Example for AWS Secrets Manager:
    // const client = new SecretsManagerClient({});
    // const response = await client.send(new GetSecretValueCommand({...}));
    // return JSON.parse(response.SecretString);
  }
}

// Then in app.module.ts:
ConfigModule.forRootAsync({
  imports: [SecretManagerModule],
  inject: [SecretManagerService],
  useFactory: async (secretManager: SecretManagerService) => {
    // In production, fetch from secret manager
    // In development, use .env files
    if (process.env.NODE_ENV === 'production') {
      const secrets = await secretManager.getSecrets();
      return { ...process.env, ...secrets };
    }
    return {};
  },
})
```

### Environment Variables

Required variables (see root `.env.example`):
- `MONGODB_URI`
- `PORT_API`
- `NODE_ENV`
- `JWT_SECRET` (for future auth)
- `CORS_ORIGIN` (optional)

