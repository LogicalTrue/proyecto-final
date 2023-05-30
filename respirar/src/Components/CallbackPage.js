import React, { useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import clients from '../Clients'

const CallbackPage = () => {
  useEffect(() => {
    const params = {
      grant_type: 'authorization_code',
      client_id: clients.clientId,
      client_secret: clients.clientSecret, 
      redirect_uri: 'http://localhost:3000/callback',
      code: queryString.parse(window.location.search).code,
    };

    const tokenEndpoint = 'http://localhost:3000/oauth2/token';

    axios.post(tokenEndpoint, queryString.stringify(params))
      .then(response => {
        // Aquí puedes manejar la respuesta del token de acceso y hacer las acciones necesarias, como guardar el token en el estado de tu aplicación o en una cookie.
      })
      .catch(error => {
        // Manejo de errores
      });
  }, []);

  return (
    <div></div>
  );
};

export default CallbackPage;