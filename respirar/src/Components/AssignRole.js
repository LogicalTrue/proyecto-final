import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AssignRole = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
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
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Asignar Rol</h1>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Rol:</label>
            <select id="role" className="form-select" value={selectedRole} onChange={handleRoleChange}>
              <option value="">Seleccionar rol</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="user" className="form-label">Usuario:</label>
            <select id="user" className="form-select" value={selectedUser} onChange={handleUserChange}>
              <option value="">Seleccionar usuario</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          <div class="d-grid gap-2 d-md-block">
            <button className="btn btn-primary" type="button" onClick={assignRole}>Asignar Rol</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignRole;
