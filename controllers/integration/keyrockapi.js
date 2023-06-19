const axios = require('axios');
const config = require('./config.js');


function TokenizedRequest(token, action, params = null) {
    return params == null ? axios(action(token)) : axios(action(token, params));
}

function FilterByKeys(key, object) {
    if (typeof key === 'number' || typeof key === 'string' || key instanceof String) return object[key]
    else if (Array.isArray(key))
        for (let k of key)
            if (k in object) object = object[k];
            else break;
    return object;
}
function _deleteKey(key, object, complex = true) {
    if (key in object) delete object[key];
    else if (complex && key.indexOf('.') > -1) {
        let k = key.substr(0, key.indexOf('.'));
        if (k in object) object[k] = _deleteKey(key.substr(k.length + 1), object[k], complex);
    }
    return object;
}
function OmitKeys(keys, object, complex = true) {
    if (typeof keys === 'number' || typeof keys === 'string' || keys instanceof String) {
        _deleteKey(keys, object, complex);
    }
    else if (Array.isArray(keys))
        for (let k of keys) _deleteKey(k, object, complex);
    return object;
}
function FilterKeys(keys, object) { /// No funciona en el modo complejo, porque el primero que filtra elimina el el resto de elementos de nivel inferior
    let obj = {};
    if (typeof keys === 'number' || typeof keys === 'string' || keys instanceof String) {
        if (keys in object) return { keys: object[keys] };
    }
    else if (Array.isArray(keys))
        for (let k of keys)
            if (k in object) obj[k] = object[k];
    return obj;
}

function FilteredTokenizedRequest(key, token, action, params) {
    if (config.api.debug) console.log("Send and Filter (action, params, token):", action, params, token, `Filter: ${key}`);
    return TokenizedRequest(token, action, params).
        then((response) => {
            let ret = FilterByKeys(key, response);
            if (config.api.debug) console.log(`FilteredData: ${ret}`)
            return ret;
        });
}

const Server = config.api.server;
const ApiRoute = `${Server}/${config.api.route}`;

const ApiHeader = (token) => ({
    'Content-Type': 'application/json',
    'X-Auth-token': token,
    'X-Subject-token': token,
    Accept: 'application/json'
});
const AuthHeader = {
    'Content-Type': 'application/json',
    'Authorization': config.api.authorization,
    Accept: 'application/json'
};

const Api = {

    //User

    Login: (token = null, data = null) => ({
        baseURL: ApiRoute,
        url: `/auth/tokens`,
        method: 'POST',
        headers: AuthHeader,
        data: token != null ? { token: token } : data
    }),
    DeleteSession: (token) => ({
        baseURL: ApiRoute,
        url: `/auth/tokens`,
        method: 'DELETE',
        headers: ApiHeader(token)
    }),
    GetUsers: (token) => ({
        baseURL: ApiRoute,
        url: '/users',
        method: 'GET',
        headers: ApiHeader(token)
    }),
    GetUser: (token, id) => ({
        baseURL: ApiRoute,
        url: `/users/${id}`,
        method: 'GET',
        headers: ApiHeader(token)
    }),
    UserOfToken: (token) => ({
        baseURL: ApiRoute,
        url: `/auth/tokens`,
        method: 'GET',
        headers: ApiHeader(token)
    }),
    CreateApp: (token, data) => ({
        baseURL: ApiRoute,
        url: `/applications`,
        method: 'POST',
        headers: ApiHeader(token),
        data: data
    }),
    CreateUser: (token, body) => ({
        baseURL: ApiRoute,
        url: `/users`,
        method: 'POST',
        headers: ApiHeader(token),
        data: body
    }),

    UpdateUser: (token, data) => {
        console.log("dentro de update : " + data.user.enabled)
        return {

            baseURL: ApiRoute,
            url: `/users/${data.user.id}`,
            method: 'PATCH',
            headers: ApiHeader(token),
            data: OmitKeys(['user.id'], data),
        }
    },
    DeleteUser: (token, id) => ({
        baseURL: ApiRoute,
        url: `/users/${id}`,
        method: 'DELETE',
        headers: ApiHeader(token)
    }),

    GetRolesByUser: (token, data) => {
        console.log("Dentro de getRoles " + data.appId)
        return {
            baseURL: ApiRoute,
            url: `/applications/${data.appId}/users/${data.userId}/roles`,
            method: 'GET',
            headers: ApiHeader(token),
        }
    },

    // GetRoles


    //Roles  
    GetRoles: (token, id) => ({
        baseURL: ApiRoute,
        url: `/applications/${id}/roles`,
        method: 'GET',
        headers: ApiHeader(token)
    }),

    GetRole: (token, data) => ({
        baseURL: ApiRoute,
        url: `/applications/${data.appId}/roles/${data.roleId}`,
        method: 'GET',
        headers: ApiHeader(token)

    }),

    GetUserRoles: (token, data) => ({
        baseURL: ApiRoute,
        url: `applications/${data.appId}/users/${data.userId}/roles`,
        method: 'GET',
        headers: ApiHeader(token)
    }),

    CreateRole: (token, data) => ({
        baseURL: ApiRoute,
        url: `/applications/${data.id}/roles`,
        method: 'POST',
        headers: ApiHeader(token),
        data: data.body
    }),

    UpdateRole: (token, data) => {
        let role = { role: { name: data.role.name, application_id: data.role.application_id } }
        return {
            baseURL: ApiRoute,
            url: `/applications/${data.role.application_id}/roles/${data.role.roleId}`,
            method: 'PATCH',
            headers: ApiHeader(token),
            data: role
        }
    },

    AssignRoleUser: (token, data) => ({
        baseURL: ApiRoute,
        url: `/applications/${data.appId}/users/${data.userId}/roles/${data.roleId}`,
        method: 'PUT',
        headers: ApiHeader(token),
    }),

    AssignRolePermission: (token, data) => ({
        baseURL: ApiRoute,
        url: `/applications/${data.appId}/roles/${data.roleId}/permissions/${data.permissionId}`,
        method: 'PUT',
        headers: ApiHeader(token),
    }),

    AssignDeleteRoleUser: (token, data) => ({
        baseURL: ApiRoute,
        url: `/applications/${data.appId}/users/${data.userId}/roles/${data.roleId}`,
        method: 'DELETE',
        headers: ApiHeader(token),
    }),
    AssignDeleteRolePermission: (token, data) => ({
        baseURL: ApiRoute,
        url: `/applications/${data.appId}/roles/${data.roleId}/permissions/${data.permissionId}`,
        method: 'DELETE',
        headers: ApiHeader(token),
    }),

    DeleteRole: (token, data) => ({
        baseURL: ApiRoute,
        url: `/applications/${data.appId}/roles/${data.roleId}`,
        method: 'DELETE',
        headers: ApiHeader(token)
    }),


    GetAllAPermissionsByRole: (token, data) => ({
        baseURL: ApiRoute,
        url: `/applications/${data.appId}/roles/${data.roleId}/permissions`,
        method: 'GET',
        headers: ApiHeader(token)
    }),


    //Permisos
    GetPermission: (token, id) => ({
        baseURL: ApiRoute,
        url: `/applications/${id}/permissions`,
        method: 'GET',
        headers: ApiHeader(token)
    }),

    GetRolePermissions: (token, data) => ({
        baseURL: ApiRoute,
        url: `applications/${data.appId}/roles/${data.roleId}/permissions`,
        method: 'GET',
        headers: ApiHeader(token)
    }),

    CreatePermission: (token, data) => ({
        baseURL: ApiRoute,
        url: `/applications/${data.id}/permissions`,
        method: 'POST',
        headers: ApiHeader(token),
        data: data.body
    }),

    AssignPermission: (token, data) => ({
        baseURL: ApiRoute,
        url: `/applications/${data.appId}/roles/${data.roleId}/permissions/${data.permissionId}`,
        method: 'PUT',
        headers: ApiHeader(token),
    }),
    DeletePermission: (token, data) => ({
        baseURL: ApiRoute,
        url: `/applications/${data.appId}/permissions/${data.permissionId}`,
        method: 'DELETE',
        headers: ApiHeader(token)
    }),

    //UpdatePermission problemas
    UpdatePermission: (token, data) => {
        let permission = { permission: { name: data.permission.name, description: data.permission.description, xml : data.permission.xml } }

        return {
            baseURL: ApiRoute,
            url: `/applications/${data.permission.application_id}/permissions/${data.permission.permissionId}`,
            method: 'PATCH',
            headers: ApiHeader(token),
            data: permission
        }
    },
}


//Para agregar una nueva funcionalidad respecto a keyrock, configurar aqui, copy y paste
//Luego en api, que esta arriba, solo es ver la documentacion, copiar y pegar o tomar como referencia
//Lo que ya esta creado

//permission

const keyrock = {
    user: {
        //key, token, action, params
        findAll: (token) => FilteredTokenizedRequest(['data', "users"], token, Api.GetUsers),
        findOne: (token, id) => FilteredTokenizedRequest('data', token, Api.GetUser, id),
        findRoles: (token, data) => FilteredTokenizedRequest('data', token, Api.GetRolesByUser, data), //problema
        findByToken: (token) => FilteredTokenizedRequest(['data', 'User'], token, Api.UserOfToken),
        update: (token, body) => FilteredTokenizedRequest('data', token, Api.UpdateUser, body),
        create: (token, body) => FilteredTokenizedRequest(['data', "user"], token, Api.CreateUser, body),
        delete: (token, id) => FilteredTokenizedRequest('data', token, Api.DeleteUser, id)
    },
    role: {
        //modificar a One en ves de All
        findAll: (token, id = null) => FilteredTokenizedRequest(['data', "roles"], token, Api.GetRoles, id),
        findOne: (token, data) => FilteredTokenizedRequest('data', token, Api.GetRole, data),
        getByUser: (token, data) => FilteredTokenizedRequest(['data', "role_user_assignments"], token, Api.GetUserRoles, data),
        findAllPermissions : (token, data) => FilteredTokenizedRequest('data', token, Api.GetAllAPermissionsByRole, data),
        create: (token, data) => FilteredTokenizedRequest('data', token, Api.CreateRole, data),
        update: (token, body) => FilteredTokenizedRequest('data', token, Api.UpdateRole, body),
        assignrolepermission: (token, data) => FilteredTokenizedRequest('data', token, Api.AssignRolePermission, data), //asigna permisos a roles
        assignroleuser: (token, data) => FilteredTokenizedRequest('data', token, Api.AssignRoleUser, data), //asigna roles a usuarios
        assigndeleteuser: (token, data) => FilteredTokenizedRequest('data', token, Api.AssignDeleteRoleUser, data), // eliminar asignacion de usuario cambiar nombre por usuarios
        assigndeletepermission: (token, data) => FilteredTokenizedRequest('data', token, Api.AssignDeleteRolePermission, data), // eliminar permisos
        delete: (token, data) => FilteredTokenizedRequest('data', token, Api.DeleteRole, data)
    },
    auth: {
        login: (username, password) => FilteredTokenizedRequest(['headers', 'x-subject-token'], null, Api.Login, { name: username, password: password }),
        refreshToken: (token) => FilteredTokenizedRequest(['headers', 'x-subject-token'], token, Api.Login),
        deleteSession: (token) => FilteredTokenizedRequest('data', token, Api.DeleteSession),
        getSessionExpires: (token) => FilteredTokenizedRequest(['data', 'expires'], token, Api.UserOfToken),
    },
    permission: {
        findByRole: (token, data) => FilteredTokenizedRequest(['data', "role_permission_assignments"], token, Api.GetRolePermissions, data),
        findOne: (token, id) => FilteredTokenizedRequest(['data', "permissions"], token, Api.GetPermission, id),
        create: (token, data) => FilteredTokenizedRequest('data', token, Api.CreatePermission, data),
        update: (token, body) => FilteredTokenizedRequest('data', token, Api.UpdatePermission, body),
        assignpermission: (token, data) => FilteredTokenizedRequest('data', token, Api.AssignPermission, data),
        delete: (token, data) => FilteredTokenizedRequest('data', token, Api.DeletePermission, data)
    },
    apps: {
        create: (token, data) => FilteredTokenizedRequest('data', token, Api.CreateApp, data),
    },
}
module.exports = keyrock;