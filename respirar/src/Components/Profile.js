import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const [userProfile, setProfile] = useState(null);
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
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
    }
  };

  const backToMain = () => {
    navigate('/main', { state });
  };

  return (
    <div className="container">
      <h1>Perfil</h1>
      {userProfile ? (
        <div>
          <p className="lead">Email: {userProfile.email}</p>
          <p className="lead">Nombre: {userProfile.username}</p>
          <p className="lead">Descripción: {userProfile.description}</p>
          <p className="lead">website: {userProfile.website}</p>
          <p className="lead">Administrador: {userProfile.admin ? 'Sí' : 'No'}</p>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
};

export default Profile;