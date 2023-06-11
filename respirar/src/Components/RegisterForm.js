import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const validationErrors = {};

    if (!username) {
      validationErrors.username = 'Por favor, ingresa un correo electrónico válido.';
    }

    if (!password) {
      validationErrors.password = 'Por favor, ingresa una contraseña válida.';
    } else if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      validationErrors.password =
        'Por favor, ingresa una contraseña que tenga un mínimo de 8 caracteres, al menos una letra y un número.';
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'Por favor, asegúrate que las contraseñas coincidan.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess('');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/users', {
        username: username,
        email: username,
        password: password,
      });
      const user = response.data;
      console.log(user);
      setSuccess('Registro exitoso. ¡Ahora puedes iniciar sesión!');
      setErrors({});
      // navigate('/post');
    } catch (error) {
      setErrors({});
      console.error('Error de registración:', error);
      setErrors('Error de registración. Por favor, verifica tus credenciales.');
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    const emailValidation = e.target.checkValidity() ? '' : 'Por favor, ingresa un correo electrónico válido.';
    setErrors((prevState) => ({ ...prevState, username: emailValidation }));
  };

  return (
    <div className="container">
      <h1 className="display-3 m-3">Registrá tu cuenta</h1>
      <div className="form-container">


        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <div className={`form-group m-3 ${errors.username && 'was-validated'}`}>
                <label htmlFor="username">Ingresá tu correo electrónico:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  className={`form-control rounded-0 ${errors.username ? 'is-invalid' : ''}`}
                  required
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <div className={`form-group m-3 ${errors.password && 'was-validated'}`}>
                <label htmlFor="password">Tu contraseña:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`form-control rounded-0 ${errors.password ? 'is-invalid' : ''}`}
                  required
                  minLength="8"
                  pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <div className={`form-group m-3 ${errors.confirmPassword && 'was-validated'}`}>
                <label htmlFor="confirm-password">Confirmá tu contraseña:</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`form-control rounded-0 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  required
                  minLength="8"
                  pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
                />
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>


      <button className="btn btn-primary m-3" onClick={handleRegister}>
        Registrarse
      </button>
      {success && <p>{success}</p>}
    </div>
  );
};


export default RegisterForm;
