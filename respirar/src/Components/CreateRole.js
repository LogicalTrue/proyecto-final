import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

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

  const backToMain = () => {
    navigate('/main', { state });
  };

  return (
    <div>
      <h1>Crear Rol</h1>
      <div>
        <input type="text" placeholder="Nombre del rol" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
      </div>
      <button onClick={createRole}>Crear Rol</button>
      <button onClick={backToMain}>Volver</button>
    </div>
  );
};

export default CreateRole;