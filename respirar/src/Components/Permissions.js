import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Permissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const user = state.user;

  useEffect(() => {
    checkAdminStatus();
    getPermissions();
  }, []);

  const checkAdminStatus = () => {
    const isAdminUser = state.user.admin;
    setIsAdmin(isAdminUser);
  };

  const editPermission = (permissionId) => {
    navigate('/editpermission', { state: { permissionId: permissionId, user: user } });
  };

  const deletePermission = async (permissionId) => {
    try {
      await axios.delete(`http://localhost:3001/api/permissions/${permissionId}`);
      setSuccessMessage('Permiso eliminado con éxito');
      getPermissions(); // Volver a obtener la lista de permisos actualizada
    } catch (error) {
      console.error('Error al eliminar el permiso:', error);
    }
  };

  const getPermissions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/permissions');
      const permissionList = response.data;
      setPermissions(permissionList);
    } catch (error) {
      console.error('Error al obtener la lista de permisos:', error);
    }
  };

  return (
    <div className="container my-4">
      {isAdmin ? (
        <div>
          <h2 className="mb-4">Lista de permisos</h2>
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          <div className="list-group">
            {permissions.map((permission) => (
              <div
                key={permission.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {permission.name}
                <div>
                  <button
                    className="btn btn-primary ms-2"
                    onClick={() => editPermission(permission.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => deletePermission(permission.id)}
                  >
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

export default Permissions;