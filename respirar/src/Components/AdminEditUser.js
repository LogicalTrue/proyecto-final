import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminEditUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const userId = state.userId;
  const userAdmin = state.adminUser;
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    admin: false,
    image: '',
    gravatar: false,
    description: '',
    website: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getUser();
    getUserList();
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

  const getUserList = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/users`);
      const userListData = response.data;
      setUserList(userListData);
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 2000);
  };

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 2000);
  };

  const validateForm = () => {
    const { username, email } = formData;

    if (!username || !email) {
      showErrorMessage('Por favor, complete todos los campos');
      return false;
    }

    if (!isValidEmail(email)) {
      showErrorMessage('Por favor, ingrese un correo electrónico válido');
      return false;
    }

    if (isUsernameDuplicate(username)) {
      showErrorMessage('El nombre de usuario ya existe');
      return false;
    }

    if (isEmailDuplicate(email)) {
      showErrorMessage('El correo electrónico ya está en uso');
      return false;
    }

    return true;
  };

  const isValidEmail = (email) => {
    // Validación básica de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isUsernameDuplicate = (username) => {
    return userList.some((user) => user.username === username);
  };

  const isEmailDuplicate = (email) => {
    return userList.some((user) => user.email === email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userId) {
      console.error('ID de usuario no definido');
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      const body = {
        id: userId,
        username: formData.username,
        email: formData.email,
        admin: formData.admin,
        image: formData.image,
        gravatar: formData.gravatar,
        description: formData.description,
        website: formData.website,
      };

      const response = await axios.patch(`http://localhost:3001/api/users/`, body);
      const updatedUser = response.data;
      console.log(updatedUser);

      showSuccessMessage('Usuario actualizado correctamente');
    } catch (error) {
      console.error('Error al modificar el usuario:', error);
    }
  };

  const handleGoBack = () => {
    navigate('/main', { state: { user: userAdmin } });
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mt-4">
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <h2>Modificar usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            Nombre de usuario:
            <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Correo electrónico:
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Imagen:
            <input type="text" className="form-control" name="image" value={formData.image} onChange={handleChange} />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Descripción:
            <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Sitio web:
            <input type="text" className="form-control" name="website" value={formData.website} onChange={handleChange} />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-check-label">
            Gravatar:
            <input type="checkbox" className="form-check-input" name="gravatar" checked={formData.gravatar} onChange={handleChange} />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-check-label">
            Administrador:
            <input type="checkbox" className="form-check-input" name="admin" checked={formData.admin} onChange={handleChange} />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
      <button onClick={handleGoBack} className="btn btn-secondary mt-3">Volver</button>
    </div>
  );
};

export default AdminEditUser;