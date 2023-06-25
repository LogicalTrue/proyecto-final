import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const validationErrors = {};

    if (!email) {
      validationErrors.email = 'Por favor, ingresa un correo electrónico válido.';
    }

    if (!username) {
      validationErrors.username = 'Por favor, ingrese un nombre de usuario válido';
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

    await axios.post('http://localhost:3001/api/users', {
      email: email,
      username: username,
      password: password
    }).then(async (response)=>{
      
      const user = response.data.user;
      const sendMail = await axios.post('http://localhost:3001/api/send/verifyemail', {
        user: { 
          email: email,
          id: user.id,
          username: username
        }
      }).then((x)=>{
        setSuccess('Registro exitoso. Te enviamos un mail para que termines tu registro');
      })
      
    }).catch((error)=>{
      validationErrors.email = error.response.data.error==='Email already used'?"No se puede crear el usuario porque el correo ya esta registrado":"Hubo un error al registrarse";
    });

    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess('');
      return;
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const emailValidation = e.target.checkValidity() ? '' : 'Por favor, ingresa un correo electrónico válido.';
    setErrors((prevState) => ({ ...prevState, email: emailValidation }));
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <h1 className="display-3 m-3">Registrá tu cuenta</h1>
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}
      <div className="form-container">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <div
                className={`form-group m-3 ${errors.username && 'was-validated'}`}
              >
                <label htmlFor="name">Ingresá tu nombre de usuario:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`form-control rounded-0 ${
                    errors.username ? 'is-invalid' : ''
                  }`}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <div
                className={`form-group m-3 ${errors.email && 'was-validated'}`}
              >
                <label htmlFor="email">Ingresá tu correo electrónico:</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`form-control rounded-0 ${
                    errors.email ? 'is-invalid' : ''
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
                  errors.password && 'was-validated'
                }`}
              >
                <label htmlFor="password">Tu contraseña:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`form-control rounded-0 ${
                    errors.password ? 'is-invalid' : ''
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
                  errors.confirmPassword && 'was-validated'
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
                    errors.confirmPassword ? 'is-invalid' : ''
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

      <button className="btn btn-primary m-3" onClick={handleBack}>
        Volver
      </button>
    </div>
  );
};

export default RegisterForm;