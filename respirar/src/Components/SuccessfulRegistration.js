import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const SuccessfulRegistration = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    processRegister();
  }, []);

  const processRegister = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/users/activate/${id}`);
      setData(response.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const handleGoToLogin = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <div className="text-center">
        <h2>Registro exitoso</h2>
        {data && <p>Bienvenidos a <b>RespirAR</b></p>}
        <button className="btn btn-primary" onClick={handleGoToLogin}>
          Volver al login
        </button>
      </div>
    </div>
  );
};

export default SuccessfulRegistration;