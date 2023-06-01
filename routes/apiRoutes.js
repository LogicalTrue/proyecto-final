const express = require('express');
//const authMiddleware = require('../middlewares/authMiddleware');
const authController = require('../controllers/authenticationController');
const userController = require('../controllers/userController');
const roleController = require('../controllers/roleController');

const router = express.Router();

// Rutas de autenticación
//router.post('/register', authController.register);

//Se invoca el archivo login, mediante un axios y luego se ejecuta un controlador, en este caso
//el authController.login, que se encuentra en la carpeta controllers

router.post('/login', authController.login);
//router.post('/verify-email', authController.verifyEmail);
//router.post('/reset-password', authController.resetPassword);

// Rutas protegidas por el middleware de autenticación
//router.use(authMiddleware);



// Rutas de usuarios
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUser);
router.patch('/users/:id', userController.updateUser);
router.post('/users', userController.createUser);
// router.delete('/users/:id', userController.deleteUser);

// Rutas de roles
router.post('/roles', roleController.createRole);
router.get('/roles', roleController.getRoles);
router.get('/roles/:id', roleController.getRole);
router.put('/roles/:id', roleController.updateRole);
// router.delete('/roles/:id', roleController.deleteRole);

module.exports = router;
