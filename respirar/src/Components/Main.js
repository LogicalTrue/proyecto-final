import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Main = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const CreateUserAsPublic = state.user.CreateUserAsPublic;

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = () => {
    const isAdminUser = state.user.admin;
    setIsAdmin(isAdminUser);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleChangeCreateUserAsPublic = async () => {
    const response = await axios.post('http://localhost:3001/api/changeCreateUserAsPublic', { enable: !CreateUserAsPublic });
    state.user.CreateUserAsPublic = response.data.enabled;
    if (state.user.CreateUserAsPublic) navigate('/', { state: state });
    else navigate('/main', { state: state });
  };

  return (
    <div className="container mt-5">
      {isAdmin ? (
        <div>
          <h1 className="text-center mb-4">Panel de administrador</h1>
          <ul className="list-group" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <li
              className="list-group-item text-center"
              style={{
                background: CreateUserAsPublic ? '#007bff' : 'lightgray',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'white',
              }}
              onClick={handleChangeCreateUserAsPublic}
              onMouseEnter={(e) => {
                e.target.style.background = '#89CFF0';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = CreateUserAsPublic ? '#007bff' : 'lightgray';
              }}
            >
              {CreateUserAsPublic ? 'Deshabilitar' : 'Habilitar'} creacion de usuarios
            </li>
            <li
              className="list-group-item text-center"
              style={{
                background: '#007bff',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'white',
              }}
              onClick={() => navigate('/users', { state: state })}
              onMouseEnter={(e) => {
                e.target.style.background = '#3396ff';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#007bff';
              }}
            >
              USUARIOS
            </li>
            <li
              className="list-group-item text-center"
              style={{
                background: '#007bff',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'white',
              }}
              onClick={() => navigate('/roles', { state: state })}
              onMouseEnter={(e) => {
                e.target.style.background = '#4ca1fc';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#007bff';
              }}
            >
              ROLES
            </li>
            <li
              className="list-group-item text-center"
              style={{
                background: '#007bff',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'white',
              }}
              onClick={() => navigate('/createrole', { state: state })}
              onMouseEnter={(e) => {
                e.target.style.background = '#4ca1fc';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#007bff';
              }}
            >
              CREAR ROL
            </li>
            <li
              className="list-group-item text-center"
              style={{
                background: '#007bff',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'white',
              }}
              onClick={() => navigate('/assignrole', { state })}
              onMouseEnter={(e) => {
                e.target.style.background = '#4ca1fc';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#007bff';
              }}
            >
              ASIGNAR ROL
            </li>
            <li
              className="list-group-item text-center"
              style={{
                background: '#007bff',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'white',
              }}
              onClick={() => navigate('/createpermission', { state })}
              onMouseEnter={(e) => {
                e.target.style.background = '#4ca1fc';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#007bff';
              }}
            >
              CREAR PERMISO
            </li>
            <li
              className="list-group-item text-center"
              style={{
                background: '#007bff',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'white',
              }}
              onClick={() => navigate('/assignpermission', { state })}
              onMouseEnter={(e) => {
                e.target.style.background = '#4ca1fc';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#007bff';
              }}
            >
              ASIGNAR PERMISO
            </li>
          </ul>
          <button className="btn btn-primary mt-3" onClick={handleLogout} style={{ width: '100%' }}>
            Cerrar sesión
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-center mb-4">Panel de usuario</h1>
          <button
            className="btn btn-link d-block mx-auto mb-2"
            onClick={() => navigate('/profile', { state })}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Ver perfil
          </button>
          <button
            className="btn btn-link d-block mx-auto mb-2"
            onClick={() => navigate('/editprofile', { state })}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Editar perfil
          </button>
          <button className="btn btn-primary mt-3 d-block mx-auto" onClick={handleLogout} style={{ width: '100%' }}>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default Main;