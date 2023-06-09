import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  
  useEffect(() => {
    checkAdminStatus();
    getRoles();
  }, []);

  const checkAdminStatus = () => {
    const isAdminUser = state.user.admin;
    setIsAdmin(isAdminUser);
  };

  const getRoles = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/roles');
      const roleList = response.data;
      setRoles(roleList);
    } catch (error) {
      console.error('Error al obtener la lista de roles:', error);
    }
  };
  console.log(roles)

  const backToMain = () => {
    navigate('/main', {state});
  };


  return (
    <div>
      {isAdmin ? (
        <div>
          <h2>Lista de roles</h2>
          <ul>
            {roles.map((role) => (
              <li key={role.id}>{role.name}</li>
            ))}
          </ul>
          <br></br>
          <button onClick={backToMain}>Volver</button>
        </div>
      ) : null}
    </div>
  );
            }
            
export default Roles;