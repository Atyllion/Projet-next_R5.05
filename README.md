# Branch 🚧 Develop

La branche **Develop** est utilisée comme branche de préproduction. Elle sert à :

- 🛠️ Intégrer les modifications issues des branches de sprint (Sprint-[id]).
- 🐞 Effectuer des tests et corriger les bugs avant de fusionner dans la branche **Release**.
- ✅ Garantir la stabilité du code avant le déploiement en production.

## Utilisation

1. **Merge des branches Sprint** :
   - 🔄 Une fois un sprint terminé, les modifications sont fusionnées dans la branche **Develop**.
   - ⚠️ Les conflits de merge sont résolus dans cette branche.

2. **Préparation pour la production** :
   - 🚀 Une fois validée, la branche **Develop** est fusionnée dans la branche **Release** pour le déploiement.