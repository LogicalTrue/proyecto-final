import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    checkAdminStatus();
    getUsers();
  }, []);

  const checkAdminStatus = () => {
    const isAdminUser = state.user.admin;
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
  console.log(users);

  const backToMain = () => {
    navigate('/main', { state });
  };

  const updateEnable = async (userId) => {
    try {
      const user = users.find((user) => user.id === userId);
      const body = {
        id: userId,
        enabled: !user.enabled, // Cambiar el estado actual
      };

      const response = await axios.patch(`http://localhost:3001/api/users`, body);
      const updatedUser = response.data;

      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              enabled: !user.enabled, // Actualizar el estado en la lista de usuarios
            };
          }
          return user;
        })
      );

      console.log(updatedUser);
    } catch (error) {
      console.error('Error al suspender el usuario', error);
    }
  };

  const editUser = (userId) => {
    navigate('/adminuseredit', {state : userId})
  };

  return (
    <div>
      {isAdmin ? (
        <div>
          <h2>Lista de usuarios</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.username}
                <button onClick={() => updateEnable(user.id)}>
                  {user.enabled ? 'Suspender' : 'Habilitar'}
                </button>
                <button onClick={() => editUser(user.id)}>Editar</button>
              </li>
            ))}
          </ul>
          <br></br>
          <button onClick={backToMain}>Volver</button>
        </div>
      ) : null}
    </div>
  );
};

export default Users;