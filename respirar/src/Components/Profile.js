import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

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
    <div>
      <h1>Perfil</h1>
      {userProfile ? (
        <div>
          <p>Email: {userProfile.email}</p>
          <p>Nombre: {userProfile.username}</p>
          <p>descripcion: {userProfile.description}</p>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
      <button onClick={backToMain}>Volver</button>
    </div>
  );
};

export default Profile;