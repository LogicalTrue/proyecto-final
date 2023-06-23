import React, { useState } from 'react';
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage('Por favor, ingrese su dirección de correo electrónico.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Por favor, ingrese una dirección de correo electrónico válida.');
      return;
    }


    

    try {
        console.log(email)
        console.log({email})

       let userMail = await axios.get(`http://localhost:3001/api/users/${email}`);
        console.log(userMail);
      await axios.post('http://localhost:3001/api/resetPassword', email);

      setSuccessMessage('Se ha enviado un correo electrónico para restablecer su contraseña.');
      setEmail('');
    } catch (error) {
      setErrorMessage('Error al enviar el correo electrónico. Por favor, inténtelo nuevamente.');
      console.error('Error al enviar el correo electrónico:', error);
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
      <h1 className="display-3 m-3">Olvidaste tu contraseña?</h1>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <div
                className={`form-group m-3 ${errors.email && 'was-validated'}`}
              >
                <label htmlFor="email">Ingresá tu correo electrónico:</label>
                <input
                  type="email"
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
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>

        <button className="btn btn-primary m-3" onClick={handleBack}>
        Volver
      </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
