const express = require('express');
//const authMiddleware = require('../middlewares/authMiddleware');
const authController = require('../controllers/authenticationController');
const userController = require('../controllers/userController');
const roleController = require('../controllers/roleController');
const permissionController = require('../controllers/permissionController')


const router = express.Router();

router.use(function (req, res, next){
    //console.log(req.method, req.url, req.session.permissions);

    if(req.session.permissions==null || !Array.isArray(req.session.permissions) || ("Admin" in req.session.permissions)){
        next('route');
        return;
    }
    else{
        for(let permission of req.session.permissions.Resource){
            if(permission.action === req.method && permission.resource=== req.url){
                next('route');
                return;
            }
        }
        res.status(401).json({ error: 'No tiene permisos para acceder a este recurso' });
    }
})


// Rutas de autenticación
// router.post('/register', userController.createUser);

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
router.get('/user/:id/roles', userController.getRolesByUser); // ok
router.get('/users/activate/:id', userController.activate)
router.patch('/users/', userController.updateUser);
router.post('/users', userController.createUser);
router.post('/changeCreateUserAsPublic', userController.changeCreateUserAsPublic);
router.delete('/users/:id', userController.deleteUser); // ok

// Rutas de roles
router.post('/roles', roleController.createRole)
router.patch('/roles', roleController.updateRole)
router.put('/roles/assignt/users', roleController.assigntRoleUsers) // es para usuario
router.put('/roles/assignt/permissions', roleController.assigntRolePermissions) // es para permisos /roles/assignt/permissions
router.get('/roles', roleController.getRoles);
router.get('/roles/:id', roleController.getRole);
router.get('/roles/:id/permissions', roleController.getAllPermissions) // desarrollar
router.delete('/roles/:id', roleController.deleteRole); // ok
router.delete('/assignt/delete/users/:userId/roles/:roleId', roleController.deleteAssigntUsers) // probar de quitar asignacion a usuario el rol
router.delete('/assignt/delete/roles/:roleId/permissions/:permissionId', roleController.deleteAssigntPermissions) // probar de quitar asignacion de permiso a un rol

//Rutas de permisos
router.post('/permissions', permissionController.createPermission)
router.patch('/permissions', permissionController.updatePermission) // ok
router.get('/permissions', permissionController.getPermissions)
router.put('/permissions/assignt', permissionController.assigntPermission)
router.delete('/permissions/:id', permissionController.deletePermission); // ok



module.exports = router;
