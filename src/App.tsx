import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import UserGithub from './pages/UserGithub';


function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Home />} />
         <Route path="users" element={<UserGithub />} />
       
      </Routes>
    </div>
  );
}

export default App;