import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/login',
        { email: username, password: password },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      const user = response.data; // Obtiene el usuario devuelto por el backend
      console.log(user);

      // Si todo está bien, redirige a la ruta de inicio
      navigate('/main', { state: { user } });
    } catch (error) {
      // Caso contrario, muestra un error de inicio de sesión
      console.error('Error de inicio de sesión:', error);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="container">
      <div className="form-group">
        <label htmlFor="username">Email:</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>
        Iniciar sesión
      </button>
      <button className="btn btn-secondary" onClick={handleRegister}>
        Registrar
      </button>
    </div>
  );
};

export default LoginForm;