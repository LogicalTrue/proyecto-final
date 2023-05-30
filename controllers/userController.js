const keyrock = require('./integration/keyrockapi');

// Función para crear un nuevo usuario en Keyrock
const createUser = async (req, res) => {
  // req.session.user.admin   /// Va a ser true si el usuario inciado es admin 
 
  token = req.session.token; // req.session.user.token;
  //const {username, email, password } = req.body; //Ojo que podes crear un usuario con más datos
  await keyrock.user.create( token, {user:req.body}).then(
    (user)=>{res.status(201).json(user);}
  ).catch((error)=>{
    res.status(400).json({ error: 'No se pudo crear el usuario' });
  });

};

// Función para obtener todos los usuarios de Keyrock
const getUsers = async (req, res) => {
  // req.session.user.admin   /// Va a ser true si el usuario inciado es admin 
  token = req.session.token; // req.session.user.token;
  await keyrock.user.findAll(token).
    then((users)=>res.status(200).json(users))

  .catch((error)=>{
    res.status(400).json({ error: 'No se pudieron obtener los usuarios' });
  });
};

// Función para obtener los datos de un usuario específico de Keyrock
const getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Realizar una solicitud a la API de Keyrock para obtener los datos de un usuario
    const response = await axios.get(`https://keyrock-api/v1/users/${userId}`);

    const user = response.data;

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo obtener el usuario' });
  }
};

// Función para modificar los datos de un usuario en Keyrock
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { email, password } = req.body;

    // Realizar una solicitud a la API de Keyrock para modificar los datos de un usuario
    const response = await axios.put(`https://keyrock-api/v1/users/${userId}`, {
      email: email,
      password: password
    });

    const updatedUser = response.data;

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo actualizar el usuario' });
  }
};

// Función para eliminar un usuario de Keyrock
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Realizar una solicitud a la API de Keyrock para eliminar un usuario
    await axios.delete(`https://keyrock-api/v1/users/${userId}`);

    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: 'No se pudo eliminar el usuario' });
  }
};

module.exports = { createUser, getUsers, getUser, updateUser, deleteUser };
