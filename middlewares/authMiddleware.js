// Middleware para verificar y decodificar el token de acceso
const authMiddleware = (req, res, next) => {
  try {
    // Obtener el token de acceso desde el encabezado de la solicitud
    const token = req.headers.authorization.split(' ')[1];

    // Verificar y decodificar el token utilizando la clave secreta
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Agregar el ID de usuario decodificado a la solicitud para su uso posterior
    req.userId = decodedToken.userId;

    // Continuar con el siguiente middleware o controlador
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token de acceso inválido' });
  }
};

module.exports = authMiddleware;
