import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage('Por favor, ingrese el usuario y la contraseña.');
      return;
    }

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
      setErrorMessage('Usuario inexistente o contraseña incorrecta.');
      console.error('Error de inicio de sesión:', error);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="container">
      <h1 className="display-3 m-3">Iniciar Sesión</h1>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="username">Ingrese su email:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="password">Ingrese su contraseña:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleLogin();
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <button className="btn btn-primary m-3" onClick={handleLogin}>
            Iniciar sesión
          </button>
          <button className="btn btn-secondary m-3" onClick={handleRegister}>
            Registrar
          </button>
          <a href="/forgotpassword" style={{ color: 'black' }}>Olvidaste tu contraseña?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;






