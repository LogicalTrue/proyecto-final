import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignRole = () => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/roles');
      const rolesData = response.data;
      setRoles(rolesData);
    } catch (error) {
      console.error('Error al obtener los roles:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users');
      const usersData = response.data;
      setUsers(usersData);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const assignRole = async () => {
    try {
      // Realiza la llamada para asignar el rol seleccionado al usuario seleccionado
      await axios.put('http://localhost:3001/api/roles/assignt', {
        roleId: selectedRole,
        userId: selectedUser,
      });
      console.log('Rol asignado correctamente');
    } catch (error) {
      console.error('Error al asignar el rol:', error);
    }
  };

  return (
    <div>
      <h1>Asignar Rol</h1>
      <div>
        <label htmlFor="role">Rol:</label>
        <select id="role" value={selectedRole} onChange={handleRoleChange}>
          <option value="">Seleccionar rol</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="user">Usuario:</label>
        <select id="user" value={selectedUser} onChange={handleUserChange}>
          <option value="">Seleccionar usuario</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>
      <button onClick={assignRole}>Asignar Rol</button>
    </div>
  );
};

export default AssignRole;