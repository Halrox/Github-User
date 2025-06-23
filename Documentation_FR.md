# Concepts principaux

## `useGitHubUsers`
Hook personnalisé qui interroge l’API GitHub avec `fetch`.

- Intègre une logique de **recherche dynamique avec debounce**
- Gère les états de **chargement**, **erreur réseau** et **limite d’API**
- Retourne les variables suivantes :
  - `users` : tableau d’utilisateurs GitHub
  - `status` : `idle`, `loading`, `success`, `error`
  - `errorType` : `network` ou `rate_limit`

## `useSelection`
Hook qui centralise toute la logique de **sélection multiple** d’éléments.

- Fonctions :
  - `toggle(id)` : sélectionne/désélectionne un ID
  - `toggleAll()` : sélectionne ou désélectionne tous les éléments
  - `clear()` : vide la sélection
- Données retournées :
  - `selectedIds` : tableau des IDs sélectionnés
  - `selectedItems` : objets sélectionnés
- Utilisé pour gérer les actions en mode édition : **dupliquer** et **supprimer**

## `UserGithub.tsx`
Page principale de l'application de recherche.

- Utilise `useGitHubUsers` pour récupérer les résultats
- Utilise `useSelection` pour la gestion des éléments sélectionnés
- Comporte :
  - une barre de recherche (`SearchBar`)
  - un bouton pour basculer entre les modes édition/visualisation
  - la barre d’action (`ActionBar`) affichée en mode édition
  - une grille des utilisateurs (`UserGrid`)
  - un message d’erreur conditionnel (`ApiErrorMessage`)

## `SearchBar.tsx`
Composant d’entrée texte.

- Permet de taper une requête GitHub
- Appelle `onChange` à chaque frappe de touche
- Déclenche la recherche automatiquement

## `ActionBar.tsx`
Composant qui s’affiche uniquement en mode édition.

- Affiche :
  - une checkbox pour tout sélectionner
  - le nombre d’éléments sélectionnés
  - deux boutons d’action : **copier** (dupliquer) et **supprimer**
- Utilise le composant `IconButton` pour les actions

## `UserGrid.tsx`
Composant qui affiche la grille d’utilisateurs.

- Affiche chaque utilisateur sous forme de `UserCard`
- Utilise les props `isSelected`, `onToggleSelect` pour gérer la sélection
- Applique une logique responsive de grille
- Affiche un message si aucun utilisateur n’est trouvé

## `UserCard.tsx`
Carte individuelle pour un utilisateur GitHub.

- Affiche :
  - avatar
  - identifiant GitHub
  - bouton vers le profil GitHub
  - une case à cocher si le mode édition est actif

## `ApiErrorMessage.tsx`
Affiche un message d’erreur basé sur le type d’erreur API retourné par `useGitHubUsers`.

- `network` → “Pas de réponse du serveur”
- `rate_limit` → “Limite atteinte, réessaie plus tard”