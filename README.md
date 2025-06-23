# GitHub User Search App

Une application React 19 moderne permettant de rechercher des utilisateurs GitHub via leur API publique.

##  Stack technique

- **React 19** + **TypeScript**
- **Vite** (build et dev server)
- **Docker + Docker Compose**
- **CSS Modules structurés**
- **React Testing Library + Jest** (tests unitaires)
- **Architecture modulaire & SOLID**

## Structure

```
src/
├── assets/               # Logos et icônes SVG
├── components/           # Composants UI réutilisables
├── css/
│   ├── components/       # CSS scoped par composant
│   ├── pages/            # CSS spécifiques aux pages
│   └── main/             # CSS global
├── hooks/                # Hooks custom : useSelection, useGitHubUsers
├── pages/                # Pages : Home, UserGithub
├── test/                 # Tests unitaires (composants + pages)
├── types/                # Typages centralisés (User, ApiError)
└── main.tsx              # Entrée de l'application
```

## Lancement avec Docker

### 1. Prérequis

- Docker
- Docker Compose

### 2. Lancer en mode développement :

```bash
docker-compose up
```

L'application sera disponible sur :
🔗 http://localhost:3000


## Lancer les tests

```bash
npm test
```

Les tests utilisent :

- `@testing-library/react`
- `jest`
- `jest-dom`
- Mocks des hooks pour isoler les composants

## Fonctionnalités

- Recherche dynamique d'utilisateurs GitHub (`GET /search/users?q=`)
- Affichage sous forme de cartes utilisateurs
- Mode édition :
  - Sélection multiple
  - Duplication (front only)
  - Suppression (front only)
- Gestion des erreurs API (`rate_limit`, `network`)
- Responsive
- Accessibilité
- Composants testés individuellement

## Bonnes pratiques appliquées

- Separation of concerns (SOLID)
- Typage strict avec `types/User.ts` et `types/Api.ts`
- Aucun ajout de dépendance inutile
- CSS organisé par contexte
- Tests unitaires présents et isolés
- Docker Dev-friendly