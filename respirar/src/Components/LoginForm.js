import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




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
    <div>
  <label htmlFor="username">Email: </label>
  <input
    type="text"
    id="username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
  <br/>
  <label htmlFor="password">Contraseña: </label>
  <input
    type="password"
    id="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <br/>
  <button onClick={handleLogin}>Iniciar sesión</button>
  <button onClick={handleRegister}>Registrar</button> 
</div>
  );
};

export default LoginForm;