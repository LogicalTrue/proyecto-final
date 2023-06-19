import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PermissionsByRole = () => {
  const [permissions, setPermissions] = useState([]);
  const [allPermissions, setAllPermissions] = useState([]);
  const location = useLocation();
  const { state } = location;
  const roleId = state.roleId;
  const navigate = useNavigate();
  const [selectedPermission, setSelectedPermission] = useState('');

  useEffect(() => {
    getPermissionsByRole();
    getAllPermissions();
  }, []);

  const getPermissionsByRole = async () => {
    try {
      const userId = state.roleId;
      const response = await axios.get(`http://localhost:3001/api/roles/${userId}/permissions`);
      const permissionsData = Array.isArray(response.data.role_permission_assignments)
        ? response.data.role_permission_assignments
        : [];
      setPermissions(permissionsData);
    } catch (error) {
      console.error('Error al obtener los permisos del rol:', error);
    }
  };

  const getAllPermissions = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/permissions`);
      const permissionsData = response.data;
      setAllPermissions(permissionsData);
    } catch (error) {
      console.error('Error al obtener todos los permisos:', error);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const deleteAssigntPermission = async (permissionId) => {
    try {

      ///assignt/delete/roles/:roleId/permissions/:permissionId

      console.log("role id: " + roleId)
      console.log("permissionId " + permissionId)
      await axios.delete(`http://localhost:3001/api/assignt/delete/roles/${roleId}/permissions/${permissionId}`);
      console.log('Permiso eliminado correctamente');
      getPermissionsByRole();
    } catch (error) {
      console.error('Error al eliminar el permiso:', error);
    }
  };

  const handlePermissionChange = (e) => {
    setSelectedPermission(e.target.value);
  };

  const addPermission = async () => {
    try {

      let body = {
        permissionId: selectedPermission,
        roleId : roleId
      }

      await axios.put(`http://localhost:3001/api/roles/assignt/permissions`, body);
      console.log('Permiso agregado correctamente');
      getPermissionsByRole();
      setSelectedPermission('');
    } catch (error) {
      console.error('Error al agregar el permiso:', error);
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8">
          <h2 className="mb-4">Permisos del Rol</h2>
          <div className="list-group">
            {permissions.map((permission) => (
              <div key={permission.id} className="list-group-item d-flex justify-content-between align-items-center">
                {permission.name}
                <button className="btn btn-danger" onClick={() => deleteAssigntPermission(permission.id)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <h2 className="mb-4">Agregar Permiso</h2>
          <div className="mb-3">
            <select className="form-select" value={selectedPermission} onChange={handlePermissionChange}>
              <option value="">Seleccionar permiso</option>
              {allPermissions.map((permission) => (
                <option key={permission.id} value={permission.id}>
                  {permission.name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" onClick={addPermission} disabled={!selectedPermission}>
            Agregar
          </button>
        </div>
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