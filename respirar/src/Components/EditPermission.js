import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditPermission = () => {
  const [permissionName, setPermissionName] = useState('');
  const [permissionDescription, setPermissionDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const permissionId = state.permissionId;
  const user = state.user;

  useEffect(() => {
    // Obtener los datos del permiso existente y asignarlos a los estados correspondientes
    const fetchPermission = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/permissions/${permissionId}`);
        const permission = response.data;
        setPermissionName(permission.name);
        setPermissionDescription(permission.description);
      } catch (error) {
        console.error('Error al obtener el permiso:', error);
      }
    };

    fetchPermission();
  }, []);

  const handleSubmit = async () => {
    try {
      setIsSaving(true);

      const response = await axios.get('http://localhost:3001/api/permissions');
      const existingPermissions = response.data;

      // Verificar si el nombre del permiso ya existe en la lista de permisos existentes
      const permissionExists = existingPermissions.some(
        (permission) => permission.name === permissionName && permission.id !== permissionId
      );
      if (permissionExists) {
        // El nombre del permiso ya existe, mostrar mensaje de error
        setErrorMessage('El permiso ya existe');
        setSuccessMessage('');
      } else {
        const body = {
          permissionId: permissionId,
          name: permissionName,
          description: permissionDescription,
        };
        await axios.patch(`http://localhost:3001/api/permissions`, body);
        setErrorMessage('');
        setSuccessMessage('Permiso editado exitosamente');
      }
    } catch (error) {
      console.error('Error al actualizar el permiso:', error);
      setErrorMessage('Error al actualizar el permiso');
      setSuccessMessage('');
    } finally {
      setIsSaving(false);
    }
  };

  const handleGoBack = () => {
    navigate('/main', { state: { user: user }}); // Redirigir al componente principal
  };

  return (
    <div className="container">
      <h1>Editar Permiso</h1>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="permissionNameInput" className="form-label">
          Nombre del Permiso:
        </label>
        <input
          id="permissionNameInput"
          type="text"
          className="form-control"
          value={permissionName}
          onChange={(e) => setPermissionName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="permissionDescriptionInput" className="form-label">
          Descripción del Permiso:
        </label>
        <input
          id="permissionDescriptionInput"
          type="text"
          className="form-control"
          value={permissionDescription}
          onChange={(e) => setPermissionDescription(e.target.value)}
        />
      </div>
      <button className="btn btn-primary ms-2" onClick={handleSubmit} disabled={isSaving}>
        Guardar
      </button>
      <button className="btn btn-secondary ms-2" onClick={handleGoBack}>
        Volver
      </button>
    </div>
  );
};

export default EditPermission;