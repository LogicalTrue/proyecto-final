import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AssignPermission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
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
      setPermissions(permissionsData);
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

  const assignPermission = async () => {
    try {
      // Realiza la llamada para asignar el permiso seleccionado al rol seleccionado
      await axios.put('http://localhost:3001/api/permissions/assign', {
        roleId: selectedRole,
        permissionId: selectedPermission,
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
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Asignar Permiso</h1>
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
            <label htmlFor="permission" className="form-label">Permiso:</label>
            <select id="permission" className="form-select" value={selectedPermission} onChange={handlePermissionChange}>
              <option value="">Seleccionar permiso</option>
              {permissions.map((permission) => (
                <option key={permission.id} value={permission.id}>
                  {permission.name}
                </option>
              ))}
            </select>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary" onClick={assignPermission}>Asignar Permiso</button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-secondary" onClick={backToMain}>Volver</button>
      </div>
    </div>
  );
};

export default AssignPermission;
