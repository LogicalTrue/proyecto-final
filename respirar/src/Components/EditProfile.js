import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const EditProfile = () => {
  const [userProfile, setProfile] = useState(null);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
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
      setUsername(userProfileData.username);
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
        website: website
      };
      const response = await axios.patch(`http://localhost:3001/api/users`, body);
      const updatedProfile = response.data;
      setProfile(updatedProfile);
      backToMain();
      window.location.reload(); // Recargar la página
    } catch (error) {
      console.error('Error al actualizar el perfil del usuario:', error);
    }
  };

  const backToMain = () => {
    navigate('/main', { state });
  };

  return (
    <div className="container">
      <h1>Editar Perfil</h1>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Nuevo nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          className="form-control"
          placeholder="Nuevo password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Nueva descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <input
          type="text"
          className="form-control"
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