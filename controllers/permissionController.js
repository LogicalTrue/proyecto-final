const axios = require('axios');
const keyrock = require('./integration/keyrockapi');
const config = require('./integration/config.js');


const createPermission = async (req, res) => {
    token = req.session.token;
  
    let data = {
      id: config.api.client,
      body: { permission: req.body },
    }
    //verificar
    console.log(req.body)

    await keyrock.permission.create(token, data).
      then((roles)=>res.status(200).json(roles))
    .catch((error)=>{
      res.status(400).json({ error: 'No se puede crear el permiso' });
    });
  };

  // Función para obtener todos los roles de Keyrock
const getPermissions = async (req, res) => {
    token = req.session.token;
    await keyrock.permission.findOne(token, config.api.client).
      then((roles)=>res.status(200).json(roles))
    .catch((error)=>{
      res.status(400).json({ error: 'No se pudieron obtener los permisos' });
    });
};

const assigntPermission = async (req, res) => {
  token = req.session.token;
  let data = {
    appId: config.api.client,
    roleId: req.body.roleId,
    permissionId: req.body.permissionId
  }

  console.log(data)
  await keyrock.permission.assignpermission(token, data).
    then((roles)=>res.status(200).json(roles))
  .catch((error)=>{
    res.status(400).json({ error: 'No se pudo asignar permiso' });
  });
};

const deletePermission =  async (req, res) => {
  token = req.session.token;
  console.log("id entra: " + req.params.id)

  let data = {
    appId: config.api.client,
    permissionId : req.params.id

  }
  await keyrock.permission.delete(token, data).
    then((users)=>res.status(200).json(users))
  .catch((error)=>{
    res.status(400).json({ error: 'No se pudo eliminar el permiso' });
  });
};

const updatePermission = async (req, res) => {
  token = req.session.token;

 await keyrock.permission
   .update(token, 
    {permission : { 
    application_id : config.api.client, 
    permissionId : req.body.permissionId, 
    description: req.body.description, 
    name : req.body.name, 
    xml : req.body.xml
  } }) 
   .then((user) => {
     res.status(201).json(user);
   })
   .catch((error) => {
     res.status(400).json({ error: 'No se pudo actualizar el permiso' });
   });
};



  module.exports = { createPermission, getPermissions, assigntPermission, deletePermission, updatePermission };