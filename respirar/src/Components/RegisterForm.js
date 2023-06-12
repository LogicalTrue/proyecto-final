import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const validationErrors = {};

    if (!username) {
      validationErrors.username = 'Por favor, ingresa un correo electrónico válido.';
    }

    if (!name) {
      validationErrors.name = 'Por favor, ingrese un nombre de usuario válido'
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
        email: username,
        username: name,
        password: password
      });
      const user = response.data;
      console.log(user);
      setSuccess('Registro exitoso. ¡Ahora puedes iniciar sesión!');
      setErrors({});
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      setErrors({});
      console.error('Error de registración:', error);
      setErrors('Error de registración. Por favor, verifica tus credenciales.');
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    const emailValidation = e.target.checkValidity() ? '' : 'Por favor, ingresa un correo electrónico válido.';
    setErrors((prevState) => ({ ...prevState, email: emailValidation }));
  };

  const handleBack = async () => {
      navigate('/');
  }

  return (
    <div className="container">
      <h1 className="display-3 m-3">Registrá tu cuenta</h1>
      <div className="form-container">
      <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <div
                className={`form-group m-3 ${errors.name && "was-validated"}`}
              >
                <label htmlFor="name">Ingresá tu nombre de usuario:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`form-control rounded-0 ${
                    errors.name ? "is-invalid" : ""
                  }`}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <div
                className={`form-group m-3 ${
                  errors.email && "was-validated"
                }`}
              >
                <label htmlFor="email">Ingresá tu correo electrónico:</label>
                <input
                  type="text"
                  id="email"
                  value={username}
                  onChange={handleUsernameChange}
                  className={`form-control rounded-0 ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  required
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <div
                className={`form-group m-3 ${
                  errors.password && "was-validated"
                }`}
              >
                <label htmlFor="password">Tu contraseña:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`form-control rounded-0 ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  required
                  minLength="8"
                  pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <div
                className={`form-group m-3 ${
                  errors.confirmPassword && "was-validated"
                }`}
              >
                <label htmlFor="confirm-password">
                  Confirmá tu contraseña:
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`form-control rounded-0 ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  required
                  minLength="8"
                  pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="btn btn-primary m-3" onClick={handleRegister}>
        Registrarse
      </button>
      {success && <p>{success}</p>}

      <button className="btn btn-primary m-3" onClick={handleBack}>
        Volver
      </button>
    </div>
  );
};


export default RegisterForm;
