import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditRole = () => {
  const [roleName, setRoleName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const roleId = state.roleId;
  const user = state.user;

  useEffect(() => {
    console.log(state.user);
    console.log(state.roleId);
  }, []);

  useEffect(() => {
    // Limpiar los mensajes después de 2 segundos
    const successTimer = setTimeout(() => {
      setSuccessMessage('');
    }, 2000);
    const errorTimer = setTimeout(() => {
      setErrorMessage('');
    }, 2000);

    return () => {
      clearTimeout(successTimer);
      clearTimeout(errorTimer);
    };
  }, [successMessage, errorMessage]);

  const handleSubmit = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/roles');
      const roles = response.data;

      // Verificar si el roleName ya existe en la lista de roles
      const roleExists = roles.some(role => role.name === roleName);
      if (roleExists) {
        // El roleName ya existe, mostrar un mensaje de error
        setErrorMessage('El roleName ya existe');
        return;
      }

      // El roleName no existe, continuar con el proceso de actualización
      const body = {
        roleId: roleId,
        name: roleName,
      };
      const updateResponse = await axios.patch('http://localhost:3001/api/roles', body);
      const updatedRole = updateResponse.data;
      setSuccessMessage('Rol actualizado exitosamente'); // Mostrar mensaje de éxito
      console.log('Rol actualizado:', updatedRole);
    } catch (error) {
      console.error('Error al actualizar el rol:', error);
    }
  };

  const handleGoBack = () => {
    navigate('/main', { state: { user: user } }); // Navegar de vuelta a la lista de roles
  };

  return (
    <div className="container mt-4">
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <h1>Editar Rol</h1>
      <div className="mb-3">
        <label htmlFor="roleNameInput" className="form-label">Nombre del Rol:</label>
        <input
          id="roleNameInput"
          type="text"
          className="form-control"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit} className="btn btn-primary">Guardar</button>
      <button onClick={handleGoBack} className="btn btn-secondary ms-2">Volver</button>
    </div>
  );
};

export default EditRole;