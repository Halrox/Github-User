import { useState, useEffect } from 'react';
import { useGitHubUsers } from '../hooks/useGitHubUsers';
import { useSelection } from '../hooks/useSelection';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import UserGrid from '../components/UserGrid';
import ActionBar from '../components/ActionBar';

import '../css/pages/User.css';
import { User } from '../types/User';
import ApiErrorMessage from '../components/ApiErrorMessage';

export default function UserGithub() {
  const [query, setQuery] = useState('');
  const [editMode, setEditMode] = useState(false);
  const { users: fetchedUsers, errorType, status } = useGitHubUsers(query); 

  const [localUsers, setLocalUsers] = useState<User[]>([]);

  useEffect(() => {
    setLocalUsers(fetchedUsers);
  }, [fetchedUsers]);

  const {
    selectedIds,
    selectedItems,
    toggle,
    toggleAll,
    isSelected,
    clear,
  } = useSelection<User>(localUsers);

  const duplicate = () => {
    const duplicates = selectedItems.map((user) => ({
      ...user,
    }));
    setLocalUsers((prev) => [...prev, ...duplicates]);
    clear();
  };

  const remove = () => {
    setLocalUsers((prev) => prev.filter((user) => !selectedIds.includes(user.id)));
    clear();
  };

  return (
    <>
      <Header />
      <SearchBar value={query} onChange={setQuery} />

      <button className="edit-button" onClick={() => setEditMode(!editMode)}>
        {editMode ? 'View' : 'Edit'}
      </button>

      {editMode && (
        <ActionBar
          selectedCount={selectedIds.length}
          allSelected={selectedIds.length === localUsers.length && selectedIds.length !== 0}
          onToggleAll={toggleAll}
          onDuplicate={duplicate}
          onDelete={remove}
        />
      )}

      {status === 'error' ? (
        <ApiErrorMessage errorType={errorType} />
      ) : (
        <UserGrid
          users={localUsers}
          isSelected={isSelected}
          onToggleSelect={toggle}
          editMode={editMode}
        />
      )}
    </>
  );
}
