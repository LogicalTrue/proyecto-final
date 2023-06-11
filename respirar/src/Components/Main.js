import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

// Importamos componentes
import Users from '../Components/Users';
import Roles from '../Components/Roles';
import CreateRole from '../Components/CreateRole';
import AssignRole from '../Components/AssignRole';
import CreatePermission from '../Components/CreatePermission';
import AssignPermission from '../Components/AssignPermission';
import Profile from '../Components/Profile';
import EditProfile from '../Components/EditProfile';

const Main = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const CreateUserAsPublic = state.user.CreateUserAsPublic; //Luego se aplica
  const [selectedComponent, setSelectedComponent] = useState(null);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = () => {
    const isAdminUser = state.user.admin;
    setIsAdmin(isAdminUser);
  };

  const handleChangeCreateUserAsPublic = async () => {
    const response = await axios.post('http://localhost:3001/api/changeCreateUserAsPublic', { enable: !CreateUserAsPublic });
    state.user.CreateUserAsPublic = response.data.enabled;
    if (state.user.CreateUserAsPublic) navigate('/', { state: state });
    else navigate('/main', { state: state });
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="container mt-5">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav">
          {isAdmin && (
            <>
              <li className={`nav-item ${selectedComponent === 'Users' ? 'active' : ''}`}>
                <button
                  className="nav-link btn"
                  onClick={() => handleComponentClick('Users')}
                >
                  Usuarios
                </button>
              </li>
              <li className={`nav-item ${selectedComponent === 'Roles' ? 'active' : ''}`}>
                <button
                  className="nav-link btn"
                  onClick={() => handleComponentClick('Roles')}
                >
                  Roles
                </button>
              </li>
              <li className={`nav-item ${selectedComponent === 'CreateRole' ? 'active' : ''}`}>
                <button
                  className="nav-link btn"
                  onClick={() => handleComponentClick('CreateRole')}
                >
                  Crear roles
                </button>
              </li>
              <li className={`nav-item ${selectedComponent === 'AssignRole' ? 'active' : ''}`}>
                <button
                  className="nav-link btn"
                  onClick={() => handleComponentClick('AssignRole')}
                >
                  Asignar roles
                </button>
              </li>
              <li className={`nav-item ${selectedComponent === 'CreatePermission' ? 'active' : ''}`}>
                <button
                  className="nav-link btn"
                  onClick={() => handleComponentClick('CreatePermission')}
                >
                  Crear permisos
                </button>
              </li>
              <li className={`nav-item ${selectedComponent === 'AssignPermission' ? 'active' : ''}`}>
                <button
                  className="nav-link btn"
                  onClick={() => handleComponentClick('AssignPermission')}
                >
                  Asignar permisos
                </button>
              </li>

              <li className={`nav-item ${selectedComponent === 'AssignPermission' ? 'active' : ''}`}>
                <button
                  className={`nav-link btn`}
                  onClick={() => handleChangeCreateUserAsPublic()}
                >
                  {CreateUserAsPublic ? 'Deshabilitar' : 'Habilitar'} registro
                </button>
              </li>
            </>
          )}

          {!isAdmin && (
            <>
              <li className={`nav-item ${selectedComponent === 'Profile' ? 'active' : ''}`}>
                <button
                  className="nav-link btn"
                  onClick={() => handleComponentClick('Profile')}
                >
                  Ver perfil
                </button>
              </li>
              <li className={`nav-item ${selectedComponent === 'EditProfile' ? 'active' : ''}`}>
                <button
                  className="nav-link btn"
                  onClick={() => handleComponentClick('EditProfile')}
                >
                  Editar perfil
                </button>
              </li>
            </>
          )}

          <li className="nav-item">
            <button className="nav-link btn" onClick={() => handleLogout()}>
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>

      {selectedComponent === 'Users' && <Users />}
      {selectedComponent === 'Roles' && <Roles />}
      {selectedComponent === 'CreateRole' && <CreateRole />}
      {selectedComponent === 'AssignRole' && <AssignRole />}
      {selectedComponent === 'CreatePermission' && <CreatePermission />}
      {selectedComponent === 'AssignPermission' && <AssignPermission />}
      {selectedComponent === 'Profile' && <Profile />}
      {selectedComponent === 'EditProfile' && <EditProfile />}
    </div>
  );
};

export default Main;