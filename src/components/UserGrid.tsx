import UserCard from './UserCard';
import '../css/components/UserGrid.css';
import { User } from '../types/User';



type Props = 
{
  users: User[];
 
  isSelected: (id: number) => boolean;
  onToggleSelect: (id: number) => void;
  editMode: boolean;
};

export default function UserGrid({
  users,
  isSelected,
  onToggleSelect,
  editMode
}: Props) {
  return (
    <div className="user-grid">
      {users.length === 0 && <p className='empty'>No results.</p>}
      <div className="grid">
        {users.map((user) => (
          <UserCard
            key={user.id * Math.random() + Date.now()}
            id={user.id}
            login={user.login}
            avatarUrl={user.avatar_url}
            selected={isSelected(user.id)}
            onSelect={() => onToggleSelect(user.id)}
            showCheckbox={editMode}
          />
        ))}
      </div>
    </div>
  );
}