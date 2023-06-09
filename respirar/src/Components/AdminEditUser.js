import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { userStatus } = state.userId;
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    enabled: false,
    admin: false,
    image: '',
    gravatar: false,
    description: '',
    website: '',
  });

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users', { params: { status: userStatus } });
      const userData = response.data;
      setUser(userData);
      setFormData(userData);
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userId) {
      console.error('ID de usuario no definido');
      return;
    }
  
    try {
      const response = await axios.patch(`http://localhost:3001/api/users/${userId}`, formData);
      const updatedUser = response.data;
      console.log(updatedUser);
      navigate('/users'); // Redirigir a la lista de usuarios después de la modificación exitosa
    } catch (error) {
      console.error('Error al modificar el usuario:', error);
    }
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Modificar usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de usuario:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <label>
          Correo electrónico:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Habilitado:
          <input type="checkbox" name="enabled" checked={formData.enabled} onChange={handleChange} />
        </label>
        <label>
          Administrador:
          <input type="checkbox" name="admin" checked={formData.admin} onChange={handleChange} />
        </label>
        <label>
          Imagen:
          <input type="text" name="image" value={formData.image} onChange={handleChange} />
        </label>
        <label>
          Gravatar:
          <input type="checkbox" name="gravatar" checked={formData.gravatar} onChange={handleChange} />
        </label>
        <label>
          Descripción:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <label>
          Sitio web:
          <input type="text" name="website" value={formData.website} onChange={handleChange} />
        </label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default EditUser;