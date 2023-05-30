import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    // const [userId, setId] = useState(null);
    const [userProfile, setProfile] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        getProfile();
    });

    const getProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/users/${state.user.id}`);
            // const userProfile = response.data;
            setProfile(response);
        } catch (error) {
          console.error('Error al obtener el perfil del usuario:', error);
        }
      };
  
    const backToMain = () => {
      navigate('/main', state);
    };

    console.log(userProfile)
  
    return (
      <div>
        <h1>Perfil</h1>
        <div>
          <p>Nombre: {userProfile?.name}</p>
          <p>Email: {userProfile?.email}</p>
        </div>
        <button onClick={backToMain}>Volver</button>
      </div>
    );
  };
  
  export default Profile;