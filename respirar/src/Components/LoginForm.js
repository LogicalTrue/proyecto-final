import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

//Este codigo, no corresponde totalmente al backend, mas bien funciona como controlador dentro de react

  const handleLogin = async () => {

    //llamamos al backend para solicitarle el inicio de sesion (este nos deberia devolver el usuario iniciado)
    //En pocas palabras, axios llama a la ruta (backend mediante POST) de api/login y invoca a la ruta que se encuentra
    //dentro del archivo apiRoutes.js
    await axios.post('http://localhost:3001/api/login', {email:username, password:password}, {headers:{'Content-Type':'application/x-www-form-urlencoded'}})
      .then(async (user ) => {
        console.log(user);

        //Si todo esta bien, nos redirige a la ruta de inicio
        navigate('/inicio');
      }).catch((error) => {

        //caso contrario, despliega un error de inicio de sesion
        console.error('Error de inicio de sesión:', error);
      });
  };

  return (
    //Esta es la vista de nuestro componente
    <div>
      Usuario: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      Contraseña: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};

export default LoginForm;