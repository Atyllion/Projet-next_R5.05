# Copilot Instructions - Habit Tracker

## Project Overview
Academic project (BUT MMI - DWDI) building a habit tracking application with Next.js 15, TypeScript, Prisma, Supabase, and Tailwind CSS v4.

**Current Sprint:** Sprint 1 - Authentication & Setup
- US1.1: User registration (email/password with validation)
- US1.2: Login/logout with session management

## Tech Stack & Architecture

### Core Technologies
- **Framework:** Next.js 15 (App Router, Server Components preferred)
- **Language:** TypeScript (strict mode, avoid `any`)
- **Styling:** Tailwind CSS v4 + shadcn/ui (new-york style)
- **Database:** PostgreSQL via Supabase + Prisma ORM
- **Auth:** Supabase Auth (JWT sessions)
- **Charts:** Recharts (for habit visualizations)
- **Deployment:** Vercel

### Project Structure
```
src/
├── app/              # Next.js App Router (routes, layouts, pages)
├── components/       # React components (atomic design pattern)
│   └── ui/          # shadcn/ui components
├── hooks/           # Custom React hooks
├── lib/             # Utilities, clients, validators
├── services/        # API wrappers, Supabase helpers
├── server/          # Server-only code (Prisma client)
└── types/           # TypeScript types & interfaces

prisma/
└── schema.prisma    # Database schema + migrations
```

### Import Aliases (tsconfig.json)
- `@/*` → `./src/*` (e.g., `@/components/ui/button`)

### Prisma Configuration
- **Client Output:** `src/generated/prisma` (excluded from tsconfig)
- **Provider:** PostgreSQL via `DATABASE_URL` env var
- **Workflow:** Modify schema → `npx prisma migrate dev` → `npx prisma generate`

## Development Workflow

### Essential Commands
```bash
npm run dev              # Start dev server (localhost:3000)
npm run build            # Production build (--no-lint flag set)
npx prisma generate      # Generate Prisma client
npx prisma migrate dev   # Create & apply migrations
npx prisma studio        # GUI for database
```

### Environment Variables
**Client-side (NEXT_PUBLIC_*):**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Server-side (NEVER expose to client):**
- `DATABASE_URL` (PostgreSQL connection)
- `SUPABASE_SERVICE_ROLE_KEY` (admin operations)

Create `.env.local` (never commit) - see `.env.example` for template.

## Code Conventions

### File Naming
- **Routes:** kebab-case (`login/page.tsx`, `register/page.tsx`)
- **Components:** PascalCase (`UserProfile.tsx`)
- **Utilities:** camelCase (`formatDate.ts`)

### Component Patterns
```tsx
// Server Component (default in App Router)
export default async function Page() {
  const data = await prisma.habit.findMany()
  return <HabitList habits={data} />
}

// Client Component (when needed)
'use client'
import { useState } from 'react'

export default function InteractiveForm() {
  const [value, setValue] = useState('')
  // ...
}
```

### Styling with Tailwind
- Use `cn()` helper from `@/lib/utils` to merge class names
- Follow mobile-first responsive design
- Example: `className={cn("base-classes", conditionalClass && "conditional-classes")}`

### TypeScript Standards
- **Always type:** function params, returns, component props
- **Use Zod** for runtime validation (API routes, forms)
- **Leverage Prisma types:** Import from `@prisma/client`
- **No `any`** - use `unknown` if type is truly uncertain

## Authentication Pattern (Supabase)

### Client-Side (src/lib/supabaseClient.ts)
```typescript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

### Server-Side (src/lib/supabaseAdmin.ts)
```typescript
import { createClient } from '@supabase/supabase-js'

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Server-only!
  { auth: { persistSession: false } }
)
```

**Rule:** Use `supabase` for client, `supabaseAdmin` for privileged server operations.

## Database Schema (Core Models)

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  avatarUrl String?
  habits    Habit[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Habit {
  id          String       @id @default(cuid())
  title       String
  description String?
  userId      String
  user        User         @relation(fields: [userId], references: [id])
  entries     HabitEntry[]
  frequency   Frequency    @default(DAILY)
  color       String?
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
}

model HabitEntry {
  id        String   @id @default(cuid())
  habitId   String
  habit     Habit    @relation(fields: [habitId], references: [id])
  date      DateTime
  completed Boolean  @default(false)
  note      String?
  createdAt DateTime @default(now())
}

enum Frequency {
  DAILY
  WEEKLY
  CUSTOM
}
```

## Git Workflow

### Branch Strategy
- `main` - Production (stable)
- `Develop` - Integration branch (note capital D)
- `sprint-1`, `sprint-2` - Sprint branches from Develop
- `feature/<ticket>-<desc>` - Feature branches

### Commit Messages (Conventional Commits)
```
feat(auth): add email validation to registration
fix(dashboard): resolve chart rendering bug
docs(readme): update environment setup
chore(deps): upgrade Next.js to 15.5.6
```

## Common Patterns

### Form Validation (Zod example)
```typescript
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

// In component/API route
const result = registerSchema.safeParse(formData)
if (!result.success) {
  return { errors: result.error.flatten() }
}
```

### Error Handling
- User-facing: Show clear, actionable messages
- Logging: Use `console.error` for dev (consider Sentry for production)
- API: Return appropriate HTTP status codes (400/401/404/500)

## Build & Deploy

### Next.js Config
- ESLint errors ignored during builds (`ignoreDuringBuilds: true`)
- Configured for Vercel deployment
- Turbopack enabled by default in dev

### Vercel Setup
1. Connect GitHub repo
2. Add environment variables in Vercel dashboard
3. Automatic deployments on push to `main`
4. Preview deployments for PRs

## Testing Strategy (To Implement)
- **Unit/Integration:** Vitest + React Testing Library
- **E2E:** Cypress or Playwright
- **Coverage Target:** 70%+
- **Pre-commit:** Husky + lint-staged for lint/format

## shadcn/ui Components
- **Config:** `components.json` (new-york style, RSC enabled)
- **Installation:** `npx shadcn@latest add <component>`
- **Location:** Components go to `src/components/ui/`
- **Customization:** Modify via Tailwind CSS variables in `globals.css`

## Accessibility Requirements
- Include `aria-*` attributes for interactive elements
- Keyboard navigation support
- Color contrast compliance (WCAG AA minimum)
- Semantic HTML structure

## Security Checklist
- ✅ Never expose `SUPABASE_SERVICE_ROLE_KEY` to client
- ✅ Validate all inputs (client + server)
- ✅ Sanitize user-generated content
- ✅ Use server-side auth checks for protected routes
- ✅ Implement rate limiting for sensitive endpoints
- ✅ Keep dependencies updated

## AI Code Generation Guidelines

When generating code:
1. **Always TypeScript** - No `any`, add proper types
2. **Match project structure** - Use established patterns
3. **Include validation** - Zod schemas for data validation
4. **Add comments** - Brief JSDoc for exported functions
5. **Follow conventions** - Naming, imports, file structure
6. **Consider accessibility** - ARIA labels, semantic HTML
7. **Prefer Server Components** - Use Client Components only when needed (state, events, browser APIs)

### Example Pattern (API Route Handler)
```typescript
// src/app/api/habits/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/server/prisma'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const habitSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    // 1. Auth check
    const authHeader = req.headers.get('authorization')
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(authHeader?.split(' ')[1])
    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Validate input
    const body = await req.json()
    const result = habitSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues }, { status: 400 })
    }

    // 3. Database operation
    const habit = await prisma.habit.create({
      data: { ...result.data, userId: user.id }
    })

    return NextResponse.json(habit, { status: 201 })
  } catch (error) {
    console.error('Habit creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

## Quick Reference

| Task | Command/Path |
|------|--------------|
| Add shadcn component | `npx shadcn@latest add <name>` |
| View database | `npx prisma studio` |
| Reset database (dev) | `npx prisma migrate reset` |
| Format code | `npm run format` |
| Type check | `npx tsc --noEmit` |
| Utility function | `@/lib/utils` (cn helper) |
| Prisma client | `@/server/prisma` |
| Supabase client | `@/lib/supabaseClient` |

---

**Last Updated:** Sprint 1 - Initial setup phase  
**For questions:** Refer to README.md or existing code patterns in `src/app`
