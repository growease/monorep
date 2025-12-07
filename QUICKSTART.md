# Quick Start Guide

## ✅ All Tasks Complete!

Your GrowEase monorepo is fully set up and ready to use.

## 🚀 Next Steps

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Environment

Create a `.env` file in the root directory:

```bash
cp .env.example .env
# Or manually create .env with these variables:
```

**Required `.env` variables:**

```env
# Environment
NODE_ENV=development

# API Server
PORT_API=3001
API_URL=http://localhost:3001

# Web Server
PORT_WEB=3000
NEXT_PUBLIC_API_URL=http://localhost:3001

# Database
MONGODB_URI=mongodb://localhost:27017/growease

# GraphQL
GRAPHQL_SCHEMA_PATH=apps/api/src/schema.gql

# Secrets (for development only)
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

### 3. Set Up Database

**Prerequisites:** Make sure MongoDB is running locally or update `MONGODB_URI` with your connection string.

```bash
# Generate Prisma client
pnpm --filter @growease/db prisma:generate

# Run initial migration
pnpm --filter @growease/db prisma:migrate dev --name init

# Optional: Open Prisma Studio to view data
pnpm --filter @growease/db prisma:studio
```

### 4. Start Development Servers

```bash
# Start both frontend and backend
pnpm dev

# Or start individually:
pnpm dev:api  # Backend only (port 3001)
pnpm dev:web  # Frontend only (port 3000)
```

### 5. Verify Everything Works

1. **Frontend**: http://localhost:3000
   - Should show the home page with health check demo

2. **Backend API**: http://localhost:3001
   - Should return `{ message: 'GrowEase API is running!' }`

3. **GraphQL Playground**: http://localhost:3001/graphql
   - Try the health query:
     ```graphql
     query Health {
       health {
         status
         timestamp
         uptime
         services {
           database
         }
       }
     }
     ```

4. **Swagger Docs**: http://localhost:3001/api-docs
   - REST API documentation

5. **Internal API Docs**: http://localhost:3000/dev/api-docs
   - Frontend API consumption guide

## 📁 Project Structure Summary

```
GrowEase/
├── apps/
│   ├── api/          # NestJS backend (GraphQL + REST)
│   └── web/          # Next.js frontend (App Router)
├── packages/
│   ├── config/       # Shared ESLint, Prettier, TS configs
│   ├── db/           # Prisma client + MongoDB
│   ├── design/       # Design tokens + Tailwind config
│   └── types/        # Shared TypeScript types
└── [root configs]    # Turborepo, pnpm, git, etc.
```

## 🎯 What's Implemented

✅ **Monorepo Setup**
- Turborepo + pnpm workspaces
- Shared config packages
- Git initialized

✅ **Backend (NestJS)**
- GraphQL API (code-first)
- REST endpoints with Swagger
- MongoDB + Prisma
- Health check (GraphQL + REST)
- Global error handling
- Config system (ready for secret managers)

✅ **Frontend (Next.js)**
- App Router setup
- TailwindCSS with design tokens
- Base layout (Nav + Sidebar)
- UX components (Loading, Error, Empty states)
- GraphQL client
- Health check demo page

✅ **Shared Packages**
- Design tokens system
- Shared TypeScript types
- Database client
- Config packages

✅ **Documentation**
- Comprehensive README
- API documentation structure
- Secret manager extension guide

## 🔧 Useful Commands

```bash
# Development
pnpm dev              # Start all apps
pnpm dev:api          # Backend only
pnpm dev:web          # Frontend only

# Building
pnpm build            # Build everything
pnpm build --filter=@growease/api  # Build specific package

# Code Quality
pnpm lint             # Lint all packages
pnpm format           # Format with Prettier
pnpm type-check       # Type check everything

# Database
pnpm --filter @growease/db prisma:studio    # Open Prisma Studio
pnpm --filter @growease/db prisma:migrate   # Run migrations
pnpm --filter @growease/db prisma:generate  # Generate client
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod` or check your MongoDB service
- Verify `MONGODB_URI` in `.env` is correct
- For cloud MongoDB (Atlas), ensure your IP is whitelisted

### Port Already in Use
- Change `PORT_API` or `PORT_WEB` in `.env`
- Kill existing processes: `lsof -ti:3001 | xargs kill`

### Prisma Client Not Generated
```bash
pnpm --filter @growease/db prisma:generate
```

### Module Resolution Issues
```bash
# Clean and reinstall
pnpm clean
pnpm install
```

## 📚 Next Development Steps

1. **Add Authentication**: Implement JWT-based auth with NestJS Guards
2. **Add More Features**: Follow the established patterns for new features
3. **Extend Design System**: Add more components and tokens
4. **Set Up CI/CD**: Configure GitHub Actions or similar
5. **Add Testing**: Expand test coverage for critical paths
6. **Production Deployment**: Configure for deployment (Docker, Vercel, etc.)

## 🎨 Design System

Design tokens are in `packages/design/src/tokens.ts`. They're automatically used by Tailwind via the config. The base theme is minimal and clean, ready for gamification later.

## 🔐 Secret Management

For production, see `apps/api/src/config/README.md` for how to extend the config system with secret managers (AWS Secrets Manager, Doppler, etc.).

---

**You're all set! Happy coding! 🚀**


## 🗄️ Prisma Commands

To run Prisma CLI commands, use one of these methods:

### Method 1: Use the predefined scripts (Recommended)
```bash
# Generate Prisma client
pnpm --filter @growease/db prisma:generate

# Push schema to database (without migrations)
pnpm --filter @growease/db prisma:db-push

# Create and apply migrations
pnpm --filter @growease/db prisma:migrate

# Open Prisma Studio
pnpm --filter @growease/db prisma:studio
```

### Method 2: Use pnpm exec (for any Prisma command)
```bash
# Any prisma command
pnpm --filter @growease/db exec prisma db push
pnpm --filter @growease/db exec prisma migrate dev
pnpm --filter @growease/db exec prisma studio
```

### Method 3: Navigate to package directory
```bash
cd packages/db
pnpm prisma db push
pnpm prisma migrate dev
```

