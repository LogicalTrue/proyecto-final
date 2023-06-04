const keyrock = require('./integration/keyrockapi');
const config = require('./integration/config.js');
const storage = require('node-persist');
const schedule = require('node-schedule')


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
  await keyrock.user.create(token, {user: req.body}).
  then((user)=>res.status(200).json(user))
  .catch((error)=>{
    if(config.api.debug) console.log(error.response.data.error);
    res.status(400).json({ error: 'No se pudo crear el usuario'});
  });
};

const getUsers = async (req, res) => {
  token = req.session.token;
  await keyrock.user.findAll(token).
    then((users)=>res.status(200).json(users))
  .catch((error)=>{
    res.status(400).json({ error: 'No se pudieron obtener los usuarios' });
  });
};

const getUser =  async (req, res) => {
  token = req.session.token; 
  await keyrock.user.findOne(token, req.params.id).
    then((users)=>res.status(200).json(users))
    
  .catch((error)=>{
    res.status(400).json({ error: 'No se pudo obtener el usuario' });
  });
};

const updateUser = async (req, res) => {
   token = req.session.token;
  await keyrock.user
    .update(token, {user: req.body}) 
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(400).json({ error: 'No se pudo actualizar el usuario' });
    });
};

module.exports = { createUser, getUsers, getUser, updateUser, changeCreateUserAsPublic, getStateCreateUserAsPublic};
