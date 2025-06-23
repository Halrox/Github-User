
import '../css/components/UserCard.css';

type Props = {
  avatarUrl: string;
  login: string;
  id: number;
  selected: boolean;
  onSelect: () => void;
  showCheckbox: boolean;
};

export default function UserCard({ avatarUrl, login, id, selected, onSelect, showCheckbox }: Props) {
  return (
    <div className="user-card">
      
      {showCheckbox && <input type="checkbox" checked={selected} onChange={onSelect} className="checkbox" />}
      <img src={avatarUrl} alt={login} className="avatar" />
      
      <div className="user-text">
          <p> {id}</p>
          <p>{login}</p>
      </div>    
      
      <button className="profile-button" onClick={() => window.open(`https://github.com/${login}`, '_blank')}>
        View profile
      </button>
    
    </div>
  );
}
