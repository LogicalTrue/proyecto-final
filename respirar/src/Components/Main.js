import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import ComponentsConfig from '../Componentsconfig';


const Main = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const CreateUserAsPublic = state.user.CreateUserAsPublic; //Luego se aplica
  const [selectedComponent, setSelectedComponent] = useState(null);
  console.log(state.user.permissions);

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
  const checkpermission = (component)=>{
      if(component in ComponentsConfig)
      for(let permission of ComponentsConfig[component].permissions){
         if(state.user.permissions.includes(permission)) return true;
      }
      return false;
 }

   const getComponentNav = (component)=>{
      if (checkpermission(component)){
      return <><li className={`nav-item ${selectedComponent === component ? 'active' : ''}`}>
        <button
          className="nav-link btn btn-bold"
          onClick={() => handleComponentClick(ComponentsConfig[component].onClick)}
        >
          {ComponentsConfig[component].Title}
        </button>
      </li></>
      }
   }

   // Función para renderizar el contenido principal según el componente seleccionado
   const renderMainContent = () => {
    if (checkpermission(selectedComponent)) {const cc = ComponentsConfig[selectedComponent]; return <cc.component/>;}
    // Si no se ha seleccionado ningún componente, muestra el mensaje de bienvenida
    return (
      <div className="container-fluid mt-5 main-container">
        <div className="welcome-message">
          <h2 className="glow-text">Bienvenido a la página Respirar</h2>
          <p className="fade-in-text">Seleccione una opción del menú para comenzar.</p>
        </div>
      </div>
    );
  };

  return (
    
    <div className="container mt-5">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav">
          { getComponentNav('Users') }
          {  getComponentNav('Roles') }
          {  getComponentNav('CreateRole') }
          {  getComponentNav('Permissions') } 
          {  getComponentNav('CreatePermission') }
          {  getComponentNav('Profile') }
          {  getComponentNav('EditProfile') }

            {checkpermission('CreateUserAsPublic') && (
              <>
              <li className='nav-item'>
                <button
                  className={`nav-link btn btn-bold`}
                  onClick={() => handleChangeCreateUserAsPublic()}
                >
                  {CreateUserAsPublic ? 'Deshabilitar' : 'Habilitar'} registro 
                </button>
              </li>
            </>
          )}          

          <li className="nav-item">
            <button className="nav-link btn btn-bold" onClick={() => handleLogout()}>
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>

      {renderMainContent()}
    </div>
  );
};

export default Main;