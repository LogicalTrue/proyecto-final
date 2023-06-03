import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (username === '' || password === '' || confirmPassword === '') {
      setError('Por favor, ingresa un email y una contraseña válidos.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/api/register',
        { email: username, password: password }
      );
      const user = response.data; // Obtiene el usuario devuelto por el backend
      console.log(user);

      setSuccess('Registro exitoso. ¡Ahora puedes iniciar sesión!');
      setError('');
      // navigate('/post');
    } catch (error) {
      setError('Error de registración. Por favor, verifica tus credenciales.');
      console.error('Error de registración:', error);
      console.log(error)
    }
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
      <label htmlFor="confirm-password">Confirmar Contraseña: </label>
      <input
        type="password"
        id="confirm-password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <br/>
      <button onClick={handleRegister}>Registrar</button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  );
};

export default RegisterForm;

