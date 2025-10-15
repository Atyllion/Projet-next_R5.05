# 📋 Backlog des User Stories

## 👤 Authentification & données

- US1.1 : En tant qu’utilisateur, je veux **créer un compte (email/mot de passe)** afin de sauvegarder mes données.  
  - Implémenter un formulaire de création de compte avec email et mot de passe.
  - Ajouter une validation des champs (email valide, mot de passe sécurisé).
  - Connecter le formulaire à une base de données pour sauvegarder les utilisateurs.
  - Gérer les erreurs (email déjà utilisé, mot de passe trop faible, etc.).

- US1.2 : En tant qu’utilisateur, je veux **me connecter/déconnecter** afin d’accéder à mes habitudes depuis n’importe quel appareil.  
  - Créer un formulaire de connexion avec email et mot de passe.
  - Ajouter une option "Mot de passe oublié" pour réinitialiser le mot de passe.
  - Implémenter une session utilisateur pour maintenir la connexion.
  - Ajouter un bouton de déconnexion.


## 📱 Gestion des habitudes

- US2.1 : En tant qu’utilisateur, je veux **créer une nouvelle habitude** avec un nom et une icône afin de commencer à la suivre.  
  - Ajouter un formulaire pour saisir le nom de l’habitude.
  - Permettre la sélection d’une icône et d’une couleur.
  - Sauvegarder l’habitude dans la base de données.

- US2.2 : En tant qu’utilisateur, je veux **choisir la fréquence** (quotidienne, hebdomadaire, personnalisée) afin d’adapter l’habitude à mon rythme.  
  - Ajouter des options prédéfinies (quotidienne, hebdomadaire).
  - Permettre une fréquence personnalisée (ex : tous les 3 jours).
  - Associer la fréquence à chaque habitude.

- US2.3 : En tant qu’utilisateur, je veux **modifier une habitude existante** afin de l’adapter à mes besoins.  
  - Ajouter une option pour éditer le nom, l’icône, la couleur, la fréquence et l’heure de rappel.
  - Mettre à jour les données dans la base de données.

- US2.4 : En tant qu’utilisateur, je veux **supprimer une habitude** afin d’alléger ma liste.  
  - Ajouter un bouton pour supprimer une habitude.
  - Demander une confirmation avant la suppression.
  - Supprimer les données associées dans la base de données.


## 🔔 Rappels & notifications

- US3.1 : En tant qu’utilisateur, je veux **recevoir une notification push** quand il est temps de réaliser une habitude afin de ne pas oublier.  
  - Configurer les notifications push pour les rappels d’habitudes.
  - Tester les notifications sur différents appareils.

- US3.2 : En tant qu’utilisateur, je veux **désactiver ou personnaliser les rappels** afin de garder le contrôle.  
  - Ajouter une option pour désactiver les rappels.
  - Permettre de personnaliser le message des notifications.

- US3.3 : En tant qu’utilisateur, je veux **définir une heure de rappel** afin de ne pas oublier.  
  - Ajouter un sélecteur d’heure pour chaque habitude.
  - Configurer des notifications push pour l’heure choisie.
  - permettre a l'utilisateur de faire des rappels multiples pour une même habitude.


## 📊 Suivi & progression

- US4.1 : En tant qu’utilisateur, je veux **voir mes habitudes du jour** dans une liste claire afin de savoir quoi faire.  
  - Afficher une liste claire des habitudes à réaliser aujourd’hui.
  - Mettre en évidence les habitudes déjà cochées.

- US4.2 : En tant qu’utilisateur, je veux **cocher une habitude comme faite** afin de suivre ma progression.  
  - Ajouter une case à cocher pour marquer une habitude comme terminée.
  - Mettre à jour la progression dans la base de données.

- US4.3 : En tant qu’utilisateur, je veux **voir un calendrier de mes habitudes** afin de visualiser mes réussites et mes manquements.  
  - Créer un calendrier pour visualiser les habitudes réalisées.
  - Ajouter des indicateurs pour les jours avec des habitudes complétées.

- US4.4 : En tant qu’utilisateur, je veux **voir mes séries (streaks)** afin d’être motivé à continuer.  
  - Calculer et afficher les séries d’habitudes complétées.
  - Réinitialiser la série en cas de jour manqué.

- US4.5 : En tant qu’utilisateur, je veux **voir des graphiques de progression dans un dashboard** afin de mesurer mes efforts sur le long terme.  
  - Créer un dashboard avec des graphiques simples (barres, lignes).
  - Afficher les statistiques hebdomadaires et mensuelles.


## 🎯 Objectifs & motivation

- US5.1 : En tant qu’utilisateur, je veux **fixer un objectif chiffré** (ex : lire 20 min/jour) afin de mesurer mes résultats.  
  - Ajouter une option pour définir un objectif.
  - Suivre la progression vers cet objectif.

- US5.2 : En tant qu’utilisateur, je veux **recevoir un message de félicitations** quand j’atteins un objectif (réussir une streak, compléter une habitude, etc.) afin de rester motivé.  
  - Afficher un message de félicitations lorsque l’objectif est atteint.
  - Ajouter une animation ou un effet visuel pour motiver l’utilisateur.
  - faire apparaître un trophée ou une récompense virtuelle sur la page d'accueil ou le dashboard.


## ⚙️ Personnalisation

- US6.1 : En tant qu’utilisateur, je veux **choisir une icône et une couleur** pour chaque habitude afin de les identifier facilement.  
  - Permettre de choisir une icône et une couleur pour chaque habitude.
  - Sauvegarder les préférences dans la base de données.

- US6.3 : En tant qu’utilisateur, je veux **changer le thème (clair/sombre)** afin d’adapter l’interface à mes préférences.  
  - Ajouter une option pour basculer entre le thème clair et sombre.
  - Sauvegarder la préférence de thème.

---

# 🗂️ Hiérarchie du Projet

```
Projet_next/
├── public/                     # Fichiers publics accessibles directement (images, icônes, etc.)
│   ├── favicon.ico
│   ├── logo.png
│   └── ...
│
├── prisma/                     # Schéma et migrations Prisma
│   ├── schema.prisma           # Définition du modèle de données (PostgreSQL)
│   └── migrations/             # Historique des migrations générées
│
├── src/                        # Code source principal
│   ├── pages/                  # Pages Next.js (routes front)
│   │   ├── api/                # API Routes (backend léger)
│   │   │   ├── habits/         
│   │   │   │   ├── index.ts    # CRUD des habitudes (GET, POST)
│   │   │   │   └── [id].ts     # Gestion d'une habitude spécifique (PUT, DELETE)
│   │   │   └── auth/           
│   │   │       ├── login.ts    # Endpoint de connexion
│   │   │       ├── register.ts # Endpoint d'inscription
│   │   │       └── logout.ts   # Endpoint de déconnexion
│   │   ├── index.tsx           # Page d'accueil
│   │   ├── dashboard.tsx       # Dashboard utilisateur
│   │   └── habits/             
│   │       ├── index.tsx       # Liste des habitudes
│   │       └── [id].tsx        # Détail d'une habitude
│   │
│   ├── components/             # Composants réutilisables
│   │   ├── ui/                 # Composants générés par shadcn/ui (basés sur Tailwind)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   ├── Navbar.tsx
│   │   ├── HabitCard.tsx
│   │   ├── HabitForm.tsx
│   │   ├── ProgressChart.tsx
│   │   └── ReminderModal.tsx
│   │
│   ├── context/                # Context API pour l'état global
│   │   ├── AuthContext.tsx
│   │   └── HabitContext.tsx
│   │
│   ├── lib/                    # Fonctions utilitaires et helpers
│   │   ├── prisma.ts           # Client Prisma (connexion à PostgreSQL)
│   │   ├── auth.ts             # Gestion de l'authentification
│   │   └── utils.ts            # Fonctions génériques (dates, calculs de streaks)
│   │
│   ├── hooks/                  # Hooks personnalisés
│   │   ├── useAuth.ts
│   │   ├── useHabits.ts
│   │   └── useNotifications.ts
│   │
│   ├── styles/                 # Fichiers de styles
│   │   ├── globals.css         # Import Tailwind + styles globaux
│   │   └── habit.module.css    # Styles spécifiques
│   │
│   └── types/                  # Types TypeScript partagés
│       └── habit.d.ts
│
├── .env.local                  # Variables d'environnement (DATABASE_URL, JWT_SECRET, etc.)
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js           # Config PostCSS (nécessaire pour Tailwind)
├── tailwind.config.js          # Config Tailwind (scan des fichiers src/)
├── tsconfig.json
└── README.md
```
---

# 📅 Planification des Sprints

### Sprint 1 – Mise en place & Authentification
- US1.1 : En tant qu’utilisateur, je veux **créer un compte (email/mot de passe)** afin de sauvegarder mes données.  
- US1.2 : En tant qu’utilisateur, je veux **me connecter/déconnecter** afin d’accéder à mes habitudes.  

### Sprint 2 – Gestion basique des habitudes
- US2.1 : En tant qu’utilisateur, je veux **créer une nouvelle habitude** avec un nom et une icône afin de commencer à la suivre.  
- US2.2 : En tant qu’utilisateur, je veux **choisir la fréquence** (quotidienne, hebdomadaire, personnalisée) afin d’adapter l’habitude à mon rythme.  
- US2.3 : En tant qu’utilisateur, je veux **modifier une habitude existante** afin de l’adapter à mes besoins.  
- US2.4 : En tant qu’utilisateur, je veux **supprimer une habitude** afin d’alléger ma liste.  

### Sprint 3 – Suivi quotidien
- US4.1 : En tant qu’utilisateur, je veux **voir mes habitudes du jour** dans une liste claire afin de savoir quoi faire.  
- US4.2 : En tant qu’utilisateur, je veux **cocher une habitude comme faite** afin de suivre ma progression.  
- US3.1 : En tant qu’utilisateur, je veux **recevoir une notification push** quand il est temps de réaliser une habitude afin de ne pas oublier.  
- US3.3 : En tant qu’utilisateur, je veux **définir une heure de rappel** afin de ne pas oublier.  

### Sprint 4 – Suivi avancé
- US4.4 : En tant qu’utilisateur, je veux **voir mes séries (streaks)** afin d’être motivé à continuer.  
- US4.3 : En tant qu’utilisateur, je veux **voir un calendrier de mes habitudes** afin de visualiser mes réussites et mes manquements.  
- US4.5 : En tant qu’utilisateur, je veux **voir des graphiques de progression dans un dashboard** afin de mesurer mes efforts sur le long terme.  
- US5.2 : En tant qu’utilisateur, je veux **recevoir un message de félicitations** quand j’atteins un objectif (réussir une streak, compléter une habitude, etc.) afin de rester motivé.

### Sprint 5 – Objectifs & personnalisation
- US5.1 : En tant qu’utilisateur, je veux **fixer un objectif chiffré** (ex : lire 20 min/jour) afin de mesurer mes résultats.  
- US6.1 : En tant qu’utilisateur, je veux **choisir une icône et une couleur** pour chaque habitude afin de les identifier facilement.  
- US6.3 : En tant qu’utilisateur, je veux **changer le thème (clair/sombre)** afin d’adapter l’interface à mes préférences.  

### Sprint 6 – Améliorations techniques
- US3.2 : En tant qu’utilisateur, je veux **désactiver ou personnaliser les rappels** afin de garder le contrôle.