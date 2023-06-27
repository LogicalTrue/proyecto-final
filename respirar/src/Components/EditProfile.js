import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const EditProfile = () => {
  const [userProfile, setProfile] = useState(null);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/users/${state.user.id}`);
      const userProfileData = response.data.user;
      setProfile(userProfileData);
      setDescription(userProfileData.description);
      setWebsite(userProfileData.website);
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
    }
  };

  const updateProfile = async () => {
    try {
      const body = {
        id: state.user.id,
        username: username,
        password: password,
        description: description,
        website: website,
      };

      const response = await axios.get(`http://localhost:3001/api/users`);
      const users = response.data;

      if (isUsernameTaken(username, users)) {
        setErrorMessage('El nombre de usuario ya está en uso');
        return;
      }

      const updateResponse = await axios.patch(`http://localhost:3001/api/users`, body);
      const updatedProfile = updateResponse.data;
      setProfile(updatedProfile);
      setSuccessMessage('Perfil actualizado exitosamente.');
      setErrorMessage('');
    } catch (error) {
      console.error('Error al actualizar el perfil del usuario:', error);
    }
  };

  const isUsernameTaken = (username, users) => {
    return users.some((user) => user.username === username);
  };

  return (
    <div className="container">
      <h1>Editar Mi Perfil</h1>

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

      <div className="form-group">
        <label htmlFor="username">Nombre:</label>
        <input
          type="text"
          className="form-control"
          id="username"
          placeholder="Nuevo nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Nuevo password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <label htmlFor="description">Descripción:</label>
        <input
          type="text"
          className="form-control"
          id="description"
          placeholder="Nueva descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />

        <label htmlFor="website">Sitio web:</label>
        <input
          type="text"
          className="form-control"
          id="website"
          placeholder="Nuevo sitio web"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <button className="btn btn-primary" onClick={updateProfile}>
          Actualizar
        </button>
      </div>
    </div>
  );
};

export default EditProfile;