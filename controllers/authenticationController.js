// authController.js
const keyrock = require('./integration/keyrockapi')

// Dentro de este, recibe los parametros post anterior de usuario y contraseña
// Se los envia a un archivo especial de integracion de keyrock, para comprobar
// que el usuario es valido mediante el metodo keyrock.auth.login

const login = async (req, res) => {
  const { email, password } = req.body;
  await keyrock.auth.login(email, password)
  .then(async (token)=>{
     
    //registrar session!!!!!!!!!!!!!!!!!!!!!!!!!!

     req.session.token = token; 
      await keyrock.user.findByToken(token).then((user)=>{
        req.session.user=user;
        res.status(200).json(user);
    });

    //Si el usuario no existe, da error de credencial invalida

  }).catch((error)=>{
      res.status(401).json({ error: 'Credenciales inválidas' });
  });
};

module.exports = { login };
