// authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware de autenticación
const authMiddleware = async (req, res, next) => {
  try {
    // Verificar si se proporciona un token de autenticación en el encabezado de la solicitud
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ error: 'Acceso no autorizado. Se requiere un token de autenticación.' });
    }

    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Buscar el usuario en la base de datos??
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ error: 'Acceso no autorizado. Usuario no encontrado.' });
    }

    // Agregar el usuario autenticado a la solicitud
    req.user = user;

    // Pasar al siguiente middleware
    next();
  } catch (error) {
    res.status(401).json({ error: 'Acceso no autorizado. Token inválido o expirado.' });
  }
};

module.exports = authMiddleware;
