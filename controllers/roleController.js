const axios = require('axios');

// Función para crear un nuevo rol en Keyrock
const createRole = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Realizar una solicitud a la API de Keyrock para crear un rol
    const response = await axios.post('https://keyrock-api/v1/roles', {
      name: name,
      description: description
    });

    const newRole = response.data;

    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo crear el rol' });
  }
};

// Función para obtener todos los roles de Keyrock
const getRoles = async (req, res) => {
  try {
    // Realizar una solicitud a la API de Keyrock para obtener todos los roles
    const response = await axios.get('https://keyrock-api/v1/roles');

    const roles = response.data;

    res.status(200).json(roles);
  } catch (error) {
    res.status(400).json({ error: 'No se pudieron obtener los roles' });
  }
};

// Función para obtener los datos de un rol específico de Keyrock
const getRole = async (req, res) => {
  try {
    const roleId = req.params.id;

    // Realizar una solicitud a la API de Keyrock para obtener los datos de un rol
    const response = await axios.get(`https://keyrock-api/v1/roles/${roleId}`);

    const role = response.data;

    res.status(200).json(role);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo obtener el rol' });
  }
};

// Función para modificar los datos de un rol en Keyrock
const updateRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const { name, description } = req.body;

    // Realizar una solicitud a la API de Keyrock para modificar los datos de un rol
    const response = await axios.put(`https://keyrock-api/v1/roles/${roleId}`, {
      name: name,
      description: description
    });

    const updatedRole = response.data;

    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo actualizar el rol' });
  }
};

// Función para eliminar un rol de Keyrock
const deleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;

    // Realizar una solicitud a la API de Keyrock para eliminar un rol
    await axios.delete(`https://keyrock-api/v1/roles/${roleId}`);

    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: 'No se pudo eliminar el rol' });
  }
};

module.exports = { createRole, getRoles, getRole, updateRole, deleteRole };
