import { useNavigate } from 'react-router-dom';
import '../css/pages/Home.css';

export default function Home() 
{
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <img src="/src/assets/logo.webp" alt="Logo" className="home-logo" width="50%" />
      <button className="user-button" onClick={() => navigate('/users')}>Github User</button>
    </div>
  );
}