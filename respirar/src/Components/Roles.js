import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  const editRole = (roleId) => {
    // Realiza la lógica para editar el rol con el ID proporcionado
    console.log(`Editar el rol con ID ${roleId}`);
  };
  
  const deleteRole = (roleId) => {
    // Realiza la lógica para eliminar el rol con el ID proporcionado
    console.log(`Eliminar el rol con ID ${roleId}`);
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

  return (
    <div className="container my-4">
      {isAdmin ? (
        <div>
          <h2 className="mb-4">Lista de roles</h2>
          <div className="list-group">
            {roles.map((role) => (
              <div key={role.id} className="list-group-item d-flex justify-content-between align-items-center">
                {role.name}
                <div>
                  <button className="btn btn-primary ms-2" onClick={() => editRole(role.id)}>
                    Editar
                  </button>
                  <button className="btn btn-danger ms-2" onClick={() => deleteRole(role.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Roles;
