import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    checkAdminStatus();
    getUsers();
  }, []);

  const checkAdminStatus = () => {
    const isAdminUser = state && state.user && state.user.admin; // Verificar si state, state.user y state.user.admin existen
    setIsAdmin(isAdminUser);
  };

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users');
      const userList = response.data;
      setUsers(userList);
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
    }
  };

  const viewRoles = (userId) => {
    const user = users.find((user) => user.id === userId);
    navigate('/rolesbyuser', { state: { userId, adminUser: state.user } });
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setSuccessMessage('Usuario eliminado exitosamente');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const updateEnable = async (userId) => {
    try {
      const user = users.find((user) => user.id === userId);
      const body = {
        id: userId,
        enabled: !user.enabled,
      };

      const response = await axios.patch('http://localhost:3001/api/users', body);
      const updatedUser = response.data;

      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              enabled: !user.enabled,
            };
          }
          return user;
        })
      );

      console.log(updatedUser);
    } catch (error) {
      console.error('Error al suspender el usuario:', error);
    }
  };

  const editUser = (userId) => {
    const user = users.find((user) => user.id === userId);
    navigate('/adminuseredit', { state: { userId, adminUser: state.user } });
  };

  return (
    <div className="container my-4">
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {isAdmin ? (
        <div>
          <h2 className="mb-4">Lista de usuarios</h2>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nombre de usuario</th>
                  <th>Email</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <div className="d-flex">
                        <button className="btn btn-primary me-2" onClick={() => updateEnable(user.id)}>
                          {user.enabled ? 'Suspender' : 'Habilitar'}
                        </button>
                        <button className="btn btn-secondary" onClick={() => editUser(user.id)}>
                          Editar
                        </button>
                        <button className="btn btn-info ms-2" onClick={() => viewRoles(user.id)}>
                          Ver roles
                        </button>
                        <button className="btn btn-danger  ms-2" onClick={() => deleteUser(user.id)}>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Users;