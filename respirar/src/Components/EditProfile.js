import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const [password, setPasswordl] = useState('');
  const [username, setUsername] = useState('');
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

  const updateProfile = async () => {
    try {
      const body = {
          id : state.user.id,
          username: username,
          password: password
 
      };
      const response = await axios.patch(`http://localhost:3001/api/users/${state.user.id}`, body);
      const updatedProfile = response.data.user;
      setProfile(updatedProfile);
    } catch (error) {
      console.error('Error al actualizar el perfil del usuario:', error);
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
          <p>Descripción: {userProfile.description}</p>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
      <div>
        
        <input type="text" placeholder="Nuevo nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br></br>
        <input type="text" placeholder="Nuevo password" value={password} onChange={(e) => setPasswordl(e.target.value)} />
      </div>
      <button onClick={updateProfile}>Actualizar</button>
      <button onClick={backToMain}>Volver</button>
    </div>
  );
};

export default Profile;