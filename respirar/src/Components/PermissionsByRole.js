import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PermissionsByRole = () => {
  const [permissions, setPermissions] = useState([]);
  const location = useLocation();
  const { state } = location;
  const roleId = state.roleId;
  const navigate = useNavigate();

  useEffect(() => {
    getPermissionsByRole();
  }, []);

  const getPermissionsByRole = async () => {
    try {

      let userId = state.roleId

      console.log("probando otra vez " + userId)

      const response = await axios.get(`http://localhost:3001/api/roles/${userId}/permissions`);
      console.log("ver permisos")
      console.log(response.data.role_permission_assignments)
      const permissionsData = Array.isArray(response.data.role_permission_assignments) ? response.data.role_permission_assignments : []; // Convertir a arreglo si es necesario
      setPermissions(permissionsData);
    } catch (error) {
      console.error('Error al obtener los permisos del rol:', error);
    }
  };

  const goBack = () => {
    navigate(-1); // Volver a la página anterior
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Permisos del Rol</h2>
      <div className="list-group">
        {permissions.map((permission) => (
          <div key={permission.id} className="list-group-item">
            {permission.name}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button className="btn btn-secondary" onClick={goBack}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default PermissionsByRole;