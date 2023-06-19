import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateRole = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [roleName, setRoleName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Limpiar los mensajes después de 2 segundos
    const timer = setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [successMessage, errorMessage]);

  const createRole = async () => {
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

      const createResponse = await axios.post('http://localhost:3001/api/roles', { name: roleName });
      const createdRole = createResponse.data;
      console.log('Rol creado exitosamente:', createdRole);
      setSuccessMessage('El rol se ha creado exitosamente.');
    } catch (error) {
      console.error('Error al crear el rol:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Crear Rol</h1>
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
            <label htmlFor="roleName" className="form-label">
              Nombre del rol
            </label>
            <input
              type="text"
              className="form-control"
              id="roleName"
              placeholder="Nombre del rol"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>

          <div className="d-grid gap-2 d-md-block">
            <button className="btn btn-primary" type="button" onClick={createRole}>
              Crear Rol
            </button>
            <div />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-3"></div>
    </div>
  );
};

export default CreateRole;