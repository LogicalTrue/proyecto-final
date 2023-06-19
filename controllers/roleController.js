const axios = require('axios');
const keyrock = require('./integration/keyrockapi');
const config = require('./integration/config.js');

// Función para crear un nuevo rol en Keyrock
const createRole = async (req, res) => {
  token = req.session.token;

  let data = {
    id: config.api.client,
    body: { role: req.body },
  }
  await keyrock.role.create(token, data).
    then((roles)=>res.status(200).json(roles))
  .catch((error)=>{
    res.status(400).json({ error: 'No se pudieron obtener los roles' });
  });
};

// Función para obtener todos los roles de Keyrock
const getRoles = async (req, res) => {
      token = req.session.token;
      await keyrock.role.findAll(token, config.api.client).
        then((roles)=>res.status(200).json(roles))
      .catch((error)=>{
        res.status(400).json({ error: 'No se pudieron obtener los roles' });
      });
};

//falta realizar

const getRole = async (req, res) => {
  token = req.session.token;

  console.log("dentro del metodo " + req.params.id)
  await keyrock.role.findOne(token, {roleId: req.params.id, appId : config.api.client}).
    then((roles)=>res.status(200).json(roles))
  .catch((error)=>{
    res.status(400).json({ error: 'No se pudieron obtener los roles' });
  });
};

//assigntRole

const assigntRole = async (req, res) => {
  token = req.session.token;
  let data = {
    appId: config.api.client,
    userId: req.body.userId,
    roleId: req.body.roleId
  }

  console.log(data)
 //ok
  await keyrock.role.assignrole(token, data).
    then((roles)=>res.status(200).json(roles))
  .catch((error)=>{
    res.status(400).json({ error: 'No se pudo asignar rol' });
  });
};

const deleteRole =  async (req, res) => {
  token = req.session.token;
  data = {
    roleId : req.params.id,
    appId: config.api.client
  }

  await keyrock.role.delete(token, data).
    then((users)=>res.status(200).json(users))
  .catch((error)=>{
    res.status(400).json({ error: 'No se pudo eliminar el rol' });
  });
};

const updateRole = async (req, res) => {
  token = req.session.token;
  console.log(req.body.roleId)
 await keyrock.role
   .update(token, {role : { application_id : config.api.client, roleId : req.body.roleId, name : req.body.name } }) 
   .then((user) => {
     res.status(201).json(user);
   })
   .catch((error) => {
     res.status(400).json({ error: 'No se pudo actualizar el rol' });
   });
};

//assigntDelete

const assigntDelete = async (req, res) => {
  token = req.session.token;
  let data = {
    appId: config.api.client,
    userId: req.params.userId,
    roleId: req.params.roleId
  }
  await keyrock.role.assigndelete(token, data).
    then((roles)=>res.status(200).json(roles))
  .catch((error)=>{
    res.status(400).json({ error: 'No se pudo asignar rol' });
  });
};


const getAllPermissions = async (req, res) => {
  token = req.session.token;

  let data = {
    appId: config.api.client,
    roleId: req.params.id
  }
  console.log("data : " + data)
  await keyrock.role.findAllPermissions(token, data).
    then((roles)=>res.status(200).json(roles))
  .catch((error)=>{
    res.status(400).json({ error: 'No se pudo asignar rol' });
  });
};



module.exports = { createRole, getRoles, getRole, assigntRole, deleteRole, updateRole, assigntDelete, getAllPermissions};
