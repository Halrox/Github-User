# Core Concepts

## `useGitHubUsers`
Custom hook that queries the GitHub API using `fetch`.

- Integrates **debounced dynamic search logic**
- Manages **loading**, **network error**, and **API rate limit** states
- Returns:
  - `users`: array of GitHub users
  - `status`: `idle`, `loading`, `success`, `error`
  - `errorType`: `network` or `rate_limit`

## `useSelection`
Hook to centralize **multi-selection logic**.

- Functions:
  - `toggle(id)`: selects/unselects an ID
  - `toggleAll()`: selects or deselects all items
  - `clear()`: clears all selections
- Returned values:
  - `selectedIds`: array of selected IDs
  - `selectedItems`: array of selected user objects
- Used to manage edit mode actions: **duplicate** and **delete**

## `UserGithub.tsx`
Main search page of the application.

- Uses `useGitHubUsers` to fetch user results
- Uses `useSelection` to manage selected items
- Contains:
  - a search bar (`SearchBar`)
  - a toggle button for edit/view mode
  - an action bar (`ActionBar`) in edit mode
  - a user grid (`UserGrid`)
  - an error message component (`ApiErrorMessage`) if needed

## `SearchBar.tsx`
Text input component.

- Lets the user type a GitHub query
- Calls `onChange` on each keystroke
- Triggers live API search

## `ActionBar.tsx`
Component shown only in edit mode.

- Displays:
  - a checkbox to select all items
  - the count of selected elements
  - two icon buttons: **copy** (duplicate) and **delete**
- Uses `IconButton` component for actions

## `UserGrid.tsx`
Displays a responsive grid of users.

- Renders each user with a `UserCard`
- Uses `isSelected`, `onToggleSelect` to handle selection
- Shows an empty message if no user matches the query

## `UserCard.tsx`
Displays individual GitHub user information.

- Shows:
  - avatar image
  - GitHub login
  - a link to the user’s GitHub profile
  - a checkbox when in edit mode

## `ApiErrorMessage.tsx`
Displays an error message based on the API error type returned by `useGitHubUsers`.

- `network` → “No response from server.”
- `rate_limit` → “GitHub rate limit reached. Please try again later.”