import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validatePassword(password, e.target.value);
  };

  const validatePassword = (passwordValue, confirmPasswordValue) => {
    const validationErrors = {};

    if (!passwordValue) {
      validationErrors.password = 'Por favor, ingresa una contraseña válida.';
    } else if (
      passwordValue.length < 8 ||
      !/\d/.test(passwordValue) ||
      !/[a-zA-Z]/.test(passwordValue)
    ) {
      validationErrors.password =
        'Por favor, ingresa una contraseña que tenga un mínimo de 8 caracteres, al menos una letra y un número.';
    }

    if (confirmPasswordValue !== passwordValue) {
      validationErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    setErrors(validationErrors);
  };

  const handleGoToLogin = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      // Mostrar mensajes de error y abortar actualización
      return;
    }

    const body = {
      id: id,
      password: password,
    };

    try {
      const updateResponse = await axios.patch('http://localhost:3001/api/users/', body);
      const updatedProfile = updateResponse.data;

      // Actualizar el perfil correctamente
      console.log('Perfil actualizado:', updatedProfile);
      setSuccessMessage('Contraseña actualizada exitosamente.');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setErrors('Error al actualizar el perfil. Por favor, inténtelo nuevamente.');
      console.error('Error al actualizar el perfil:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="display-3 m-3">Nueva Contraseña</h1>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className={`form-control rounded-0 ${errors.password ? 'is-invalid' : ''}`}
            required
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={`form-control rounded-0 ${errors.confirmPassword ? 'is-invalid' : ''}`}
            required
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Actualizar Contraseña
        </button>
      </form>
    </div>
  );
};

export default NewPassword;