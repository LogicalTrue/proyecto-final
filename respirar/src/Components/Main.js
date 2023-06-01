import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Main = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  
  
  useEffect(() => {
    checkAdminStatus();
  });

  const checkAdminStatus = () => {
    const isAdminUser = state.user.admin;
    setIsAdmin(isAdminUser);
  };


  const handleLogout = () => {
    navigate('/');
  };

  console.log(state);
  console.log(state.user);

  return (
    <div>
      {isAdmin ? (
        <div>
           <h1>Panel de administrador</h1>
          <ul>
            <li>
              <button onClick={() => navigate('/users', { state: state })}>Ver usuarios</button>
            </li>
            <li>
              <button onClick={() => navigate('/roles', { state: state })}>Ver roles</button>
            </li>
            <li>
              <button onClick={() => navigate('/profile', { state })}>Ver perfil</button>
            </li>
          </ul>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <div>
           <h1>Panel de usuario</h1>
          <br></br>
          <button onClick={() => navigate('/profile', { state })}>Ver perfil</button>
          <br></br>
          <button onClick={() => navigate('/editprofile', { state })}>Editar perfil</button>
          <br></br>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
};

export default Main;