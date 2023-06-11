import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AdminEditUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const userId = state.userId
  const userAdmin  = state.adminUser
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
      const response = await axios.get(`http://localhost:3001/api/users/${userId}`);
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

      //aca se le pasa el body solamente, no va dar
      let body = {
        id : userId,
        username: formData.username,
        email : formData.email,
        enabled : formData.enabled,
        admin : formData.admin,
        image : formData.image,
        gravatar : formData.gravatar,
        description : formData.description,
        website : formData.website
      }

      const response = await axios.patch(`http://localhost:3001/api/users/`, body);
      const updatedUser = response.data;
      console.log(updatedUser)
    } catch (error) {
      console.error('Error al modificar el usuario:', error);
    }
  };

  const handleGoBack = () => {
    navigate('/users', { state : { user: userAdmin } });
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Modificar usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre de usuario:
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Correo electrónico:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Habilitado:
            <input type="checkbox" name="enabled" checked={formData.enabled} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Administrador:
            <input type="checkbox" name="admin" checked={formData.admin} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Imagen:
            <input type="text" name="image" value={formData.image} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Gravatar:
            <input type="checkbox" name="gravatar" checked={formData.gravatar} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Descripción:
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Sitio web:
            <input type="text" name="website" value={formData.website} onChange={handleChange} />
          </label>
        </div>
        <button type="submit">Guardar</button>
      </form>
        <button onClick={handleGoBack}>Volver</button>
    </div>
  );
};

export default AdminEditUser;