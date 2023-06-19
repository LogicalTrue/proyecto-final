import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const RolesByUser = () => {
  const [userRoles, setUserRoles] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const location = useLocation();
  const { state } = location;
  const userId = state.userId;
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    getUserRoles();
    getAllRoles();
  }, []);

  const getUserRoles = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/user/${userId}/roles`);
      const roleList = response.data.role_user_assignments;
      const roles = roleList.map((role) => role.role_id);
      setUserRoles(roles);
    } catch (error) {
      console.error('Error al obtener los roles del usuario:', error);
    }
  };

  const getAllRoles = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/roles`);
      const rolesData = response.data;
      setAllRoles(rolesData);
    } catch (error) {
      console.error('Error al obtener todos los roles:', error);
    }
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const assignRole = async () => {
    try {

      console.log(selectedRole)
      console.log(userId)

      await axios.put(`http://localhost:3001/api/roles/assignt/users`, {
        roleId: selectedRole,
        userId: userId,
      });
      console.log('Rol asignado correctamente');
      // Actualizar la lista de roles del usuario
      getUserRoles();
      // Limpiar la selección
      setSelectedRole('');
    } catch (error) {
      console.error('Error al asignar el rol:', error);
    }
  };

  const deleteAssign = async (roleId) => {
    try {
      await axios.delete(`http://localhost:3001/api/assignt/delete/users/${userId}/roles/${roleId}`);
      console.log('Asignacion eliminada correctamente');
      // Actualizar la lista de roles del usuario
      getUserRoles();
    } catch (error) {
      console.error('Error al eliminar asignacion:', error);
    }
  };

  const goBack = () => {
    navigate(-1); // Volver a la página anterior
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6">
          <h2 className="mb-4">Roles del Usuario</h2>
          <div className="list-group">
            {userRoles.map((roleId) => {
              const role = allRoles.find((role) => role.id === roleId);
              if (role) {
                return (
                  <div key={role.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {role.name}
                    {userRoles.length > 1 ? (
                      <button className="btn btn-danger" onClick={() => deleteAssign(role.id)}>
                        Eliminar
                      </button>
                    ) : (
                      <button className="btn btn-danger" disabled>
                        Eliminar
                      </button>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        <div className="col-md-6">
          <h2 className="mb-4">Asignar Nuevo Rol</h2>
          <div className="mb-3">
            <select id="role" className="form-select" value={selectedRole} onChange={handleRoleChange}>
              <option value="">Seleccionar rol</option>
              {allRoles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div className="d-grid gap-2 d-md-block">
            <button className="btn btn-primary" type="button" onClick={assignRole}>
              Asignar
            </button>
          </div>
          <div className="mt-4">
            <button className="btn btn-secondary" onClick={goBack}>
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolesByUser;