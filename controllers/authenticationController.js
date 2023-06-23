// authController.js
const keyrock = require('./integration/keyrockapi')
const userController = require('./userController');
const config = require('./integration/config.js');
const { mailSenderController } = require('./integration/mailSenderController');

// Dentro de este, recibe los parametros post anterior de usuario y contraseña
// Se los envia a un archivo especial de integracion de keyrock, para comprobar
// que el usuario es valido mediante el metodo keyrock.auth.login

const login = async (req, res) => {
  const { email, password } = req.body;
  await keyrock.auth.login(email, password)
  .then(async (token)=>{
     
    //registrar session!!!!!!!!!!!!!!!!!!!!!!!!!!

     req.session.token = token; 
      await keyrock.user.findByToken(token).then(async (user)=>{
        req.session.user=user;
        req.session.permissions = await getPermission(token, user);
        //console.log(req.session.permissions);
        user["CreateUserAsPublic"]=await userController.getStateCreateUserAsPublic();
        user.permissions = req.session.permissions.Names;
        res.status(200).json(user);
    });

    //Si el usuario no existe, da error de credencial invalida

  }).catch((error)=>{
      req.session.token=null;
      req.session.permissions=null;
      req.session.user=null;
      res.status(401).json({ error: 'Credenciales inválidas' });
  });
};

async function getPermission(token, user){
  
  let returns = {Names:["Basic"], Resource:[{resource:'/users', action:'GET'},{resource:'/users', action:'PATCH'}]};

  if(user.admin) returns.Names.push("Admin");

  await keyrock.role.getByUser(token, {appId:config.api.client, userId:user.id}).then(async (roles)=>{
    //console.log(roles);
      for(let role of roles){
          await keyrock.permission.findByRole(token, {appId:config.api.client, roleId:role.role_id}).then(async (permissions)=>{
              //console.log(permissions);
              for(let permission of permissions){
                 returns.Names.push(permission.name);
                 returns.Resource.push({resource:permission.resource, action:permission.action});
              }
               
          });
      }
  }).catch((error)=>{});
  return returns;
}

const mailSender = async (req, res) => {
  console.log("Llegó a la función mailSender");
  console.log("Usuario: ", req.body);
  await mailSenderController(req.body.user).
    then((user)=>res.status(200).json(user))
  .catch((error)=>{
    res.status(400).json({ error: 'No se pudo enviar el mail' });
  });
};

const forgotpassword = async (req, res) => {
  const email = req.body.email; // Obtener el correo electrónico desde la solicitud

  try {
    const user = await User.findOne({ email: email }); // Buscar el usuario por el correo electrónico

    if (!user) {
      // Si no se encuentra ningún usuario con ese correo electrónico
      return res.status(404).json({ error: 'No se encontró ningún usuario con ese correo electrónico' });
    }
    S
    // Proceder con el envío del correo electrónico para restablecer la contraseña
    await mailSenderController(user);

    res.status(200).json({ message: 'El correo electrónico de restablecimiento de contraseña ha sido enviado' });
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud' });
  }
};

module.exports = { login, mailSender, forgotpassword };
