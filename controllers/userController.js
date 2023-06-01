const keyrock = require('./integration/keyrockapi');

const createUser = async (req, res) => {
  // req.session.user.admin
  token = req.session.token; // req.session.user.token;
  await keyrock.user.create( token, {user:req.body}).then(
    (user)=>{res.status(201).json(user);}
  ).catch((error)=>{
    res.status(400).json({ error: 'No se pudo crear el usuario' });
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
    .update(token, req.body) // Pasar body en lugar de req.body directamente
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(400).json({ error: 'No se pudo actualizar el usuario' });
    });
};

module.exports = { createUser, getUsers, getUser, updateUser };
