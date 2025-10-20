### 🚀 Sprint 1 — Mise en place & Authentification

- **US1.1 — Créer un compte (email / mot de passe)**  
   En tant qu’utilisateur·rice, je veux pouvoir créer un compte pour sauvegarder mes données.
   - 📝 Formulaire d’inscription (email + mot de passe)
   - ✅ Validation des champs (email valide, mot de passe sécurisé)
   - 💾 Connexion au stockage / base de données pour créer l’utilisateur
   - ⚠️ Gestion des erreurs : email déjà utilisé, mot de passe trop faible, champs manquants

- **US1.2 — Connexion / Déconnexion**  
   En tant qu’utilisateur·rice, je veux me connecter et me déconnecter pour accéder à mes habitudes depuis n’importe quel appareil.
   - 🔐 Formulaire de connexion (email + mot de passe)
   - 🔁 Option « Mot de passe oublié » / réinitialisation par email
   - 🔒 Gestion de la session (cookies / JWT / sessions serveur)
   - 🚪 Bouton de déconnexion et nettoyage de la session

---

# Next.js App Template

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
