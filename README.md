# Branch 🚀 Release

La branche **Release** est utilisée comme branche de production. Elle sert à :

- 🌐 Déployer le code validé sur l'environnement de production via CI/CD (Vercel).
- 🔒 Garantir que le code en production est stable et testé.

## Utilisation

1. **Fusion depuis Develop** :
   - 🔄 Une fois les tests terminés sur la branche **Develop**, celle-ci est fusionnée dans **Release**.

2. **Déploiement** :
   - 🚀 Le pipeline CI/CD déploie automatiquement le code. (Probablement sur Vercel)

3. **Maintenance** :
   - 🛠️ Les hotfixes ou corrections urgentes peuvent être directement appliqués sur cette branche si nécessaire.