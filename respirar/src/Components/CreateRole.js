import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateRole = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [roleName, setRoleName] = useState('');

  const createRole = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/roles', { name: roleName });
      console.log('Rol creado exitosamente:', response.data);
    } catch (error) {
      console.error('Error al crear el rol:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Crear Rol</h1>
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

          <div class="d-grid gap-2 d-md-block">
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