# 📝 Copilot Instruction (version enrichie)

## 🎯 Résumé & objectif
Application : Habit Tracker (suivi d’habitudes).  
But : projet académique (BUT MMI, parcours DWDI).  
Objectif : produire une application moderne, robuste, documentée, reproductible et facile à évaluer par un jury. Le dépôt doit contenir tout le contexte (architecture, commandes, conventions, templates, scripts, tests, CI/CD, et exemples de données).

---

## 📌 Livrables attendus
- App Next.js 15 (App Router, TypeScript, Turbopack) déployée sur Vercel.
- Backend léger via Supabase (Postgres + Auth + Storage). Prisma pour ORM/migrations.
- UI avec Tailwind CSS v4 + shadcn/ui, composants accessibles et responsive.
- Visualisation : Recharts pour les graphiques d’habitudes.
- Tests unitaires, integration et e2e.
- Documentation complète (README + SPRINT-NOTES.md + PR template + issue templates).
- CI automatisée (lint, test, build, preview deploys).

---

## ⚙️ Stack technique (détaillé)
- Framework : Next.js 15 (App Router — préférer Server Components quand pertinent)
- Langage : TypeScript (strict mode)
- Bundler : Turbopack
- UI : Tailwind CSS v4, shadcn/ui (Radix), Storybook (ou Chromatic)
- Charts : Recharts
- ORM : Prisma (client généré)
- DB : PostgreSQL (Supabase)
- Auth & Storage : Supabase SDK (client + admin via service key)
- Déploiement : Vercel
- CI : GitHub Actions (lint/test/build/migrate)
- Tests : Vitest + React Testing Library; Cypress ou Playwright pour e2e
- Lint/Format : ESLint (flat config), Prettier
- Observabilité : Sentry (erreurs), LogRocket ou simple console + telemetry
- Containerisation : Docker (optionnel pour dev/local CI)

---

## 🗂️ Architecture & conventions de code
- Privilégier la séparation front / services / lib / components.
- Dossiers recommandés :
    - app/ (Next.js App Router: routes et layouts)
    - src/components/ (atomes → molecules → organisms)
    - src/ui/ (composants shadcn personnalisés)
    - src/hooks/
    - src/lib/ (clients, utilitaires, formats, validators)
    - src/server/ (logiques server-only, prisma client wrapper)
    - src/services/ (API wrappers, supabase helpers)
    - prisma/ (schema.prisma, migrations)
    - scripts/ (seed, admin utilities)
    - tests/ (unit / integration)
    - e2e/ (Cypress/Playwright specs)
    - .github/workflows/ (CI)
- Naming : kebab-case pour fichiers de route, camelCase pour fonctions, PascalCase pour composants React.
- Types : éviter any ; privilégier types explicites, zod pour validation.

---

## 🔐 Variables d’environnement (exemples)
Ne pas committer `.env.local`. Dans Vercel → Settings → Environment Variables.

- Prisma (serveur / migrations)
    DATABASE_URL="postgresql://postgres:password@host:5432/dbname"

- Supabase (client)
    NEXT_PUBLIC_SUPABASE_URL="https://<project>.supabase.co"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="public-anon-key"

- Supabase (server/admin, à exposer uniquement en CI / server)
    SUPABASE_SERVICE_ROLE_KEY="service-role-key"  # Never expose to client

- Sentry
    NEXT_PUBLIC_SENTRY_DSN="https://...@sentry.io/..."
    SENTRY_AUTH_TOKEN="..."

- Other
    NODE_ENV=development
    NEXT_PUBLIC_APP_NAME="Habit Tracker"
    NEXT_PUBLIC_DEFAULT_LOCALE="fr"

Consignes :
- PREFIXER les variables exposées au client par NEXT_PUBLIC_.  
- Service role keys et secrets uniquement en env server/CI (Vercel variables masked).
- Ne jamais logguer des secrets.

---

## 🗃️ Schéma de données (Prisma) — proposition étendue
Extrait de `schema.prisma` (exemples safe, à adapter) :

datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
}

generator client {
    provider = "prisma-client-js"
}

model User {
    id          String    @id @default(cuid())
    email       String    @unique
    name        String?
    avatarUrl   String?
    habits      Habit[]
    sessions    Session[]
    createdAt   DateTime  @default(now())
    updatedAt   DateTime  @updatedAt
}

model Habit {
    id          String      @id @default(cuid())
    title       String
    description String?
    user        User        @relation(fields: [userId], references: [id])
    userId      String
    entries     HabitEntry[]
    tags        Tag[]       @relation("HabitTags", references: [id])
    createdAt   DateTime    @default(now())
    updatedAt   DateTime    @updatedAt
    color       String?     // hex or token
    frequency   Frequency   @default(DAILY)
}

model HabitEntry {
    id        String   @id @default(cuid())
    habit     Habit    @relation(fields: [habitId], references: [id])
    habitId   String
    date      DateTime
    completed Boolean  @default(false)
    note      String?
    createdAt DateTime @default(now())
}

model Tag {
    id    String  @id @default(cuid())
    name  String
    color String?
    habits Habit[] @relation("HabitTags")
}

model Session {
    id        String   @id @default(cuid())
    user      User     @relation(fields: [userId], references: [id])
    userId    String
    provider  String
    createdAt DateTime @default(now())
}

enum Frequency {
    DAILY
    WEEKLY
    CUSTOM
}

Ajouts recommandés : AuditLog, FeatureFlags, Metrics table (optionnel).

---

## 🔧 Commandes & scripts utiles (package.json)
- dev: "next dev"
- build: "next build"
- start: "next start"
- lint: "eslint . --ext .ts,.tsx --max-warnings=0"
- format: "prettier --write ."
- prisma:generate: "prisma generate"
- prisma:migrate: "prisma migrate dev --name init"
- prisma:deploy: "prisma migrate deploy"
- seed: "ts-node ./scripts/seed.ts"
- test: "vitest"
- e2e: "cypress open" (ou playwright)

Recommandation : inclure "postinstall": "prisma generate && prisma migrate deploy" si nécessaire pour Vercel.

---

## 🧩 Flux d’authentification (Supabase)
- Côté client : utiliser NEXT_PUBLIC_SUPABASE_* pour init supabase client.
- Côté serveur (API / server actions) : utiliser SUPABASE_SERVICE_ROLE_KEY dans un client admin pour opérations privilèges.
- Stratégie : sessions via Supabase Auth (JWT), validation côté server en vérifiant l’Authorization header ou via cookies.
- Ne jamais envoyer SUPABASE_SERVICE_ROLE_KEY au client.

Exemple pattern :
- src/lib/supabaseClient.ts (client public)
- src/lib/supabaseAdmin.ts (server only, utiliser process.env.SUPABASE_SERVICE_ROLE_KEY)

---

## 🧪 Tests & qualité
- Unit & integration : Vitest + React Testing Library. Coverage minimale souhaitée 70%+.
- E2E : Cypress ou Playwright — scénarios principaux : signup, login, créer habitude, cocher jour, dashboard chart.
- Lint strict : ESLint (rules partagées). Pre-commit hooks : husky + lint-staged.
- PR checks : lint, test, build.

---

## ♻️ CI / CD (GitHub Actions — pipeline recommandé)
- On push to Develop / main and PRs:
    - jobs: setup-node -> install -> prisma generate -> lint -> test -> build -> run migrations (if deploy to preview)
- Automated preview deploys via Vercel integration.
- On merge to main: run prisma migrate deploy (in workflow or via Vercel post-deploy step).

---

## 🚀 Déploiement (Vercel)
- Configs : NEXT_PUBLIC_* en Environment Variables (Preview + Production).
- next.config.ts :
    eslint: { ignoreDuringBuilds: true } // si besoin
- Migrations : exécuter `prisma migrate deploy` en step CI après build, ou via `postinstall`.
- Seeds / admin tasks : scripts séparés ou jobs CI protégés.

---

## 🧭 Conventions Git & PR
- Branches :
    - main (stable, prod)
    - Develop (intégration — noter la casse)
    - feature/<ticket-number>-short-desc
    - hotfix/<short-desc>
    - release/<version>
- Commit messages (convention) :
    - feat(scope): courte description
    - fix(scope): courte description
    - docs(scope): docs only
    - chore: maintenance
- PR template : résumé, screenshots, étapes pour tester, checklist (lint, tests verts, build ok, migrations ok, doc mise à jour).

PR Checklist (exemple) :
- [ ] Lint passed
- [ ] Tests passed
- [ ] Build succeeded
- [ ] Migrations / seeds inclus si besoin
- [ ] Documentation mise à jour
- [ ] Accessibility check (basic)

---

## 🧾 Documentation essentielle à inclure
- README.md : description, stack, setup local, env, scripts, architecture, conventions, déploiement.
- DEVELOPERS.md : guides pour dev, seed, prisma, db resets, debug.
- SPRINT-NOTES.md par sprint (journal de décisions).
- API.md : endpoints, payloads, contracts (ou openapi minimal).
- SECURITY.md : fuite de secrets, handling des clés, rotation keys.
- PR_TEMPLATE.md, ISSUE_TEMPLATE.md.

---

## UI / UX / Accessibilité
- Design tokens via Tailwind config (colors, spacing, typography).
- Components shadcn : documenter props, accessibility behaviors.
- Always include aria-* attributes for interactive controls.
- Keyboard navigation & contrast checks.
- Mobile-first responsive patterns.
- Internationalization : next-intl ou i18next. Default fr, support en/other.

---

## Performance & caching
- Utiliser images optimisées (next/image).
- Cacher réponses publiques avec ISR ou caching headers.
- Prefer Server Components pour données initiales.
- Eviter requêtes redondantes ; utiliser SWR / react-query pour cache + revalidation.
- Pagination & limits pour listes.

---

## Sécurité & bonnes pratiques
- Valider toutes les entrées (Zod / yup) côté client et serveur.
- Protéger routes server via vérification JWT / supabase session.
- Content Security Policy via headers.
- Limiter exposition des clés ; utiliser Vercel env pour secrets.
- Rate limiting pour endpoints sensibles (API edge / server functions).
- Éviter d’exposer migrations DB/public keys.

---

## Observabilité & monitoring
- Intégrer Sentry pour erreurs JS/SSR.
- Logs structurés côté server (json) pour requêtes/migrations.
- Health checks simples (endpoint /api/health).

---

## Scripts utilitaires & admin
- scripts/seed.ts : popule dev avec users, habits, entries.
- scripts/reset-db.ts : prudence — drop & migrate (usage CI/dev local).
- scripts/export-data.ts : dump DB pour backup (non en prod sans sécurité).

---

## Templates & exemples (pour IA / Copilot)
Quand tu génères du code ou des fichiers :
- Toujours TypeScript — pas d'any.
- Ajouter JSDoc/TSDoc courts.
- Ajouter tests associés (unit ou integration minimal).
- Respecter la structure: app/ → route → page.tsx ou layout.tsx.
- Utiliser zod pour la validation d’API.
- Exposer les types Prisma via src/types/prisma.ts si besoin.
- Ajouter commentaire TODO si décision d’implémentation nécessaire.

Exemple minimal pour une API route (pattern) :
- route handler en server action / edge function (selon besoin)
- validation zod du body
- auth check (get user via supabase admin)
- prisma ops via server-only prisma client
- return JSON + status codes cohérents

---

## Exemples utiles (rapides)
1) Commandes dev local
- Installer : npm ci
- Générer Prisma : npx prisma generate
- Run dev : npm run dev
- Seed : npm run seed

2) Générer migration
- npx prisma migrate dev --name init

3) Rebuild prisma client après modification
- npx prisma generate

---

## Checklist pour évaluation académique
- [ ] README complet + steps d’installation
- [ ] .env.example fourni (sanitized)
- [ ] Seed data & instructions pour reproduire DB
- [ ] Scripts pour tests / build / deploy
- [ ] PRs documentées et SPRINT-NOTES
- [ ] Déploiement public (Vercel) accessible
- [ ] Tests e2e couvrant user flows principaux

---

## Commandes Git utiles (rappel)
# Créer une branche de sprint à partir de Develop
git checkout Develop
git pull
git checkout -b sprint-1
git push -u origin sprint-1

---

## Règles ESLint exemplaires (flat config simplifiée)
- ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "src/generated/**"]
- rules:
    - "@typescript-eslint/no-require-imports": "off"
    - "@typescript-eslint/no-unused-vars": "warn"
    - "@typescript-eslint/no-unused-expressions": "warn"
    - ajouter règles accessibility/aria si besoin

---

## Notes finales pour une IA (directive)
- Objectif : produire code lisible, testé et documenté.  
- Toujours vérifier : secrets, types, validations, tests.  
- Si une décision de sécurité/perf est nécessaire, proposer 2 options (trade-offs) et recommander une.  
- Produire exemples concrets (fichiers, snippets, tests) lorsqu’on propose une nouvelle feature.

---

Conserver ce fichier à la racine : .github/copilot-instruction pour que l’IA/outil de génération ait tout le contexte et les conventions du projet.