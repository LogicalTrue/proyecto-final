import React from 'react';


const PostRegister = () => {
  // Supongamos que tienes el objeto `user` con los datos del usuario registrado
  const user = {
    email: 'example@example.com',
    // Otros datos del usuario
  };

  return (
    <div>
    <h1>Registro exitoso</h1>
      <p>Se ha enviado un correo electrónico a: </p>
      <p>Por favor, revisa tu bandeja de entrada para completar el proceso de registro.</p>
    </div>
  );
};

export default PostRegister;