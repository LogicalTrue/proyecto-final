const keyrock = require('./integration/keyrockapi');
const config = require('./integration/config.js');
const storage = require('node-persist');
const schedule = require('node-schedule')
const path = require("path")

async function TokenForCreateUser(token=null){
  await storage.init().catch((error)=>{if(config.api.debug) console.log(error);});;
    if(token==false) token = null;
    else if(token==null) token = await storage.get('createuser_token').catch((error)=>{if(config.api.debug) console.log(error);});;
    
    if(token!=null)
    token = await keyrock.auth.refreshToken(token)
      .then(async (newToken)=>{
        keyrock.auth.deleteSession(token).catch((err)=>null);
        return newToken
      })
      .catch((error)=>{
        if(config.api.debug) console.log(error.response.data.error);
        return null;
      });
    
    await storage.updateItem('createuser_token', token).catch((error)=>{if(config.api.debug) console.log(error);});
    return token;
}

async function getStateCreateUserAsPublic(){
  return await TokenForCreateUser() !=null;
}


async function setStateCreateUserAsPublic(token=null){
  token = await TokenForCreateUser(token);
  /// automatizar la actualizacion de tokens una vez que se habilita
  if(token!=null){
    let expire = await keyrock.auth.getSessionExpires(token).catch((err)=>null);
    expire = new Date(expire);
    expire.setMinutes(expire.getMinutes()-2);
    schedule.scheduleJob(expire,async ()=>await setStateCreateUserAsPublic())  ///Esto se puede poner una configuracion que renueve los token cada X minutos, lo cual es más seguro
    if(config.api.debug) console.log(`Schedule Renew Token in: ${expire}`);
  }
  return token!=null;
}

const changeCreateUserAsPublic = async (req, res) => {
  let token = false; 
  if(req.body.enable==true) token=req.session.token;
  let status = await setStateCreateUserAsPublic(token);
  res.status(200).json({enabled:status});
};

const createUser = async (req, res) => {
  const token = await TokenForCreateUser();

  console.log(req.body)

  await keyrock.user.create(token, {user: req.body}).
  then(async (user)=>{
   
    //Agregar Rol base
    await keyrock.role.assignroleuser(token, {appId:config.api.client, roleId:"provider", userId:user.id})
    .catch((error)=>{if(config.api.debug) console.log(error.response.data.error);});
    
    await keyrock.user.update(token, {user: {id:user.id, enabled:false}})
    .catch((error) => {if(config.api.debug) console.log(error.response.data.error);});
    //Enviar mail de confirmacion con la direccion a la ruta de activacion

      res.status(200).json({user})
    })


  .catch((error)=>{
    if(config.api.debug) console.log(error.response.data.error);
    res.status(400).json({ error: 'No se pudo crear el usuario'});
  });
};

const activate = async(req, res)=>{
    const token = await TokenForCreateUser();
    console.log("a ver que onda " + req.params.id )
     await keyrock.user
    .update(token, {user: {id:req.params.id, enabled:true}}) 
    .then((user) => {
    })
    .catch((error) => {
    });
    res.sendFile(path.dirname(__dirname)+'/respirar/build/index.html');  //Para redirigir la respuesta a react - desde react pueden tomar esta
}

const getUsers = async (req, res) => {
  token = req.session.token;
  console.log("Usuario: " + req.body)
  await keyrock.user.findAll(token).
    then((users)=>res.status(200).json(users))
  .catch((error)=>{
    res.status(400).json({ error: 'No se pudieron obtener los usuarios' });
  });
};

//deberia caer aca

const getUser =  async (req, res) => {
  token = req.session.token; 
  console.log("Usuario: " + req.body)
  await keyrock.user.findOne(token, req.params.id).
    then((users)=>res.status(200).json(users))
    
  .catch((error)=>{
    res.status(400).json({ error: 'No se pudo obtener el usuario' });
  });
};

const updateUser = async (req, res) => {
   token = req.session.token;

  console.log(req.session.token)
  console.log(req.body)

  await keyrock.user
    .update(token, {user: req.body}) 
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(400).json({ error: 'No se pudo actualizar el usuario' });
    });
};

const deleteUser =  async (req, res) => {
  token = req.session.token;

  console.log("id " + req.params.id)
  await keyrock.user.delete(token, req.params.id).
    then((users)=>res.status(200).json(users))
  .catch((error)=>{
    res.status(400).json({ error: 'No se pudo obtener el usuario' });
  });
};

const getRolesByUser =  async (req, res) => {
  token = req.session.token; 
  console.log("User id: " + req.params.id)
  await keyrock.user.findRoles(token, {userId: req.params.id, appId : config.api.client}).
    then((users)=>res.status(200).json(users))
  .catch((error)=>{
    res.status(400).json({ error: 'No se pudo obtener lista de roles' });
  });
};

//getRoles

module.exports = { createUser, getUsers, getUser, updateUser, changeCreateUserAsPublic, getStateCreateUserAsPublic, activate, deleteUser, getRolesByUser};