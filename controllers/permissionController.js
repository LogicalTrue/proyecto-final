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
      res.status(400).json({ error: 'No se pudieron obtener los roles' });
    });
  };

  // Función para obtener todos los roles de Keyrock
const getPermissions = async (req, res) => {
    token = req.session.token;
    await keyrock.permission.findOne(token, config.api.client).
      then((roles)=>res.status(200).json(roles))
    .catch((error)=>{
      res.status(400).json({ error: 'No se pudieron obtener los roles' });
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
    res.status(400).json({ error: 'No se pudo asignar rol' });
  });
};



  module.exports = { createPermission, getPermissions, assigntPermission };