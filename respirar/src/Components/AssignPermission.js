import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AssignPermission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [roles, setRoles] = useState([]);
  const [permissions, setpermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedPermission, setSelectedPermission] = useState('');

  useEffect(() => {
    fetchPermissions();
    fetchRoles();
  }, []);

  const fetchPermissions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/permissions');
      const permissionsData = response.data;
      setpermissions(permissionsData);
    } catch (error) {
      console.error('Error al obtener los permisos:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/roles');
      const rolesData = response.data;
      setRoles(rolesData);
    } catch (error) {
      console.error('Error al obtener los roles:', error);
    }
  };

  const handlePermissionChange = (e) => {
    setSelectedPermission(e.target.value);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const AssignPermission = async () => {
    try {
      // Realiza la llamada para asignar el rol seleccionado al usuario seleccionado
      await axios.put('http://localhost:3001/api/permissions/assignt', {
        permissionId: selectedRole,
        roleId: selectedPermission,
      });
      console.log('Permiso asignado correctamente');
    } catch (error) {
      console.error('Error al asignar el permiso:', error);
    }
  };

  const backToMain = () => {
    navigate('/main', { state });
  };

  return (
    <div>
      <h1>Asignar Permiso</h1>
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
        <label htmlFor="permission">Permiso:</label>
        <select id="permission" value={selectedPermission} onChange={handlePermissionChange}>
          <option value="">Seleccionar permiso</option>
          {permissions.map((permission) => (
            <option key={permission.id} value={permission.id}>
              {permission.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={AssignPermission}>Asignar Permiso</button>
      <button onClick={backToMain}>Volver</button>

    </div>
  );
};

export default AssignPermission;