import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const user = state.user;

  useEffect(() => {
    console.log(state.user);
    checkAdminStatus();
    getRoles();
  }, []);

  const checkAdminStatus = () => {
    const isAdminUser = state.user.admin;
    setIsAdmin(isAdminUser);
  };

  const editRole = (roleId) => {
    navigate('/editrole', { state: { roleId: roleId, user: user } });
  };

  const deleteRole = async (roleId) => {
    try {
      await axios.delete(`http://localhost:3001/api/roles/${roleId}`);
      setRoles((prevRoles) => prevRoles.filter((role) => role.id !== roleId));
      setSuccessMessage('Rol eliminado exitosamente');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error al eliminar el rol:', error);
    }
  };

  const viewPermissions = (roleId) => {
    console.log(roleId)
    navigate('/permissionsbyrole', { state: { roleId: roleId, adminUser: state.user } });
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
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
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
                  <button className="btn btn-info ms-2" onClick={() => viewPermissions(role.id)}>
                    Ver permisos
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