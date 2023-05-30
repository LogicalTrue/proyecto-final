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
  console.log(users)

  const backToMain = () => {
    navigate('/main', {state});
  };


  return (
    <div>
      {isAdmin ? (
        <div>
          <h2>Lista de usuarios</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
          <br></br>
          <button onClick={backToMain}>Volver</button>
        </div>
      ) : null}
    </div>
  );
            }
            
export default Users;