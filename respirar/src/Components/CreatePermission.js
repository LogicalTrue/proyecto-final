import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreatePermission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [permissionName, setPermissionName] = useState('');
  const [action, setAction] = useState('');
  const [resource, setResource] = useState('');
  const [isRegex, setIsRegex] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const createPermission = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/permissions');
      const existingPermissions = response.data;

      // Verificar si el nombre del permiso ya existe en la lista de permisos existentes
      const permissionExists = existingPermissions.some(
        (permission) => permission.name === permissionName
      );
      if (permissionExists) {
        // El nombre del permiso ya existe, mostrar mensaje de error
        setErrorMessage('El permiso ya existe');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000); // Limpiar el mensaje de error después de 2 segundos
        return;
      }

      // El nombre del permiso no existe, continuar con el proceso de creación
      const createResponse = await axios.post('http://localhost:3001/api/permissions', {
        name: permissionName,
        action: action,
        resource: resource,
        is_regex: isRegex,
      });
      console.log('Permiso creado exitosamente:', createResponse.data);
      setSuccessMessage('El permiso se ha creado exitosamente.');
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000); // Limpiar el mensaje de éxito después de 2 segundos
    } catch (error) {
      console.error('Error al crear el permiso:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Crear Permiso</h1>
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre del permiso"
              value={permissionName}
              onChange={(e) => setPermissionName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Acción"
              value={action}
              onChange={(e) => setAction(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Recurso"
              value={resource}
              onChange={(e) => setResource(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                checked={isRegex}
                onChange={(e) => setIsRegex(e.target.checked)}
              />
              ¿Es una expresión regular?
            </label>
          </div>
          <div className="d-grid gap-2 d-md-block">
            <button className="btn btn-primary" type="button" onClick={createPermission}>
              Crear Permiso
            </button>
            <div />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-3"></div>
    </div>
  );
};

export default CreatePermission;