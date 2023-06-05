const axios = require('axios');
const config = require('./config.js');

function TokenizedRequest(token, action, params=null){
    return params==null? axios(action(token)):axios(action(token, params));
}

function FilterByKeys(key, object){
    if(typeof key === 'number' || typeof key === 'string' || key instanceof String ) return object[key]
    else if(Array.isArray(key))
        for(let k of key) 
            if(k in object) object=object[k];
            else break;
    return object;
}
function _deleteKey(key, object, complex=true){
    if(key in object) delete object[key];
    else if(complex && key.indexOf('.')>-1){
        let k = key.substr(0,key.indexOf('.'));
        if(k in object) object[k]=_deleteKey(key.substr(k.length+1),object[k],complex);
    }
    return object;
}
function OmitKeys(keys, object, complex=true){
    if(typeof keys === 'number' || typeof keys === 'string' || keys instanceof String ){
        _deleteKey(keys, object, complex);
    }
    else if(Array.isArray(keys))
     for(let k of keys) _deleteKey(k, object, complex);
     return object;
}
function FilterKeys(keys, object){ /// No funciona en el modo complejo, porque el primero que filtra elimina el el resto de elementos de nivel inferior
    let obj={};
    if(typeof keys === 'number' || typeof keys === 'string' || keys instanceof String ){
        if(keys in object) return {keys:object[keys]};
    }
    else if(Array.isArray(keys))
     for(let k of keys) 
         if(k in object) obj[k]=object[k];
     return obj;
 }

function FilteredTokenizedRequest(key, token, action, params){
    if(config.api.debug) console.log("Send and Filter (action, params, token):",action, params, token, `Filter: ${key}`);
    return TokenizedRequest(token, action, params).
    then((response)=>{
        let ret = FilterByKeys(key, response);
        if(config.api.debug) console.log(`FilteredData: ${ret}`)
        return ret;
    });
}

const Server = config.api.server;
const ApiRoute = `${Server}/${config.api.route}`;

const ApiHeader = (token)=>({
    'Content-Type':'application/json',
    'X-Auth-token':token,
    'X-Subject-token':token,
    Accept:'application/json'
});
const AuthHeader = {
    'Content-Type':'application/json',
    'Authorization':config.api.authorization,
    Accept:'application/json'
};

const Api = {

    //User

    Login: (token=null, data=null)=>({
        baseURL: ApiRoute,
        url: `/auth/tokens`,
        method: 'POST',
        headers: AuthHeader,
        data: token!=null?{token:token}:data
    }),
    DeleteSession: (token)=>({
        baseURL: ApiRoute,
        url: `/auth/tokens`,
        method: 'DELETE',
        headers: ApiHeader(token)
    }),
    GetUsers: (token) => {
        console.log("La ruta es : "+ ApiRoute)
        console.log(ApiHeader(token))
        
        return { 
          baseURL: ApiRoute,
          url: '/users',
          method: 'GET',
          headers: ApiHeader(token)
        };
      },
    GetUser: (token, id)=>({
        baseURL: ApiRoute,
        url: `/users/${id}`,
        method: 'GET',
        headers: ApiHeader(token)
    }),
    UserOfToken: (token)=>({
        baseURL: ApiRoute,
        url: `/auth/tokens`,
        method: 'GET',
        headers: ApiHeader(token)
    }),
    CreateApp: (token, data)=>({
        baseURL: ApiRoute,
        url: `/applications`,
        method: 'POST',
        headers: ApiHeader(token),
        data:data
    }),
    CreateUser: (token, body) => ({      
          baseURL: ApiRoute,
          url: `/users`,
          method: 'POST',
          headers: ApiHeader(token),
          data: body
    }),
     UpdateUser: (token, data)=>({
         baseURL: ApiRoute,
         url: `/users/${data.user.id}`,
         method: 'PATCH',
         headers: ApiHeader(token),
         data: OmitKeys(['user.id'], data),
     }),


    //Roles  
    GetRoles: (token, id) => ({
          baseURL: ApiRoute,
          url: `/applications/${id}/roles`,
          method: 'GET',
          headers:  ApiHeader(token) 
      }),

      CreateRole: (token, data) => ({      
        baseURL: ApiRoute,
        url: `/applications/${data.id}/roles`,
        method: 'POST',
        headers: ApiHeader(token),
        data: data.body
    }),

    AssignRole: (token, data) => {      

        console.log("el token es : " + token)
        console.log("app id es : " + data.appId)

        return{ 
        baseURL: ApiRoute,
        url: `/applications/${data.appId}/users/${data.userId}/roles/${data.roleId}`,
        method: 'PUT',
        headers: ApiHeader(token),
    };
  } 
}
    

//Para agregar una nueva funcionalidad respecto a keyrock, configurar aqui, copy y paste
//Luego en api, que esta arriba, solo es ver la documentacion, copiar y pegar o tomar como referencia
//Lo que ya esta creado

const keyrock={
 user:{
    //key, token, action, params
    findAll: (token)=>FilteredTokenizedRequest(['data', "users"], token, Api.GetUsers),
    findOne: (token, id)=>FilteredTokenizedRequest('data', token, Api.GetUser, id),
    findByToken: (token)=>FilteredTokenizedRequest(['data','User'], token, Api.UserOfToken),
    update: (token, body)=>FilteredTokenizedRequest('data', token, Api.UpdateUser, body),
    create: (token, body) => FilteredTokenizedRequest('data', token, Api.CreateUser, body),
},
role:{
    findAll: (token, id)=>FilteredTokenizedRequest(['data', "roles"], token, Api.GetRoles, id),
    create: (token, data) => FilteredTokenizedRequest('data', token, Api.CreateRole, data),
    assignrole : (token, data) => FilteredTokenizedRequest('data', token, Api.AssignRole, data)
},
 auth:{
    login: (username, password)=>
    FilteredTokenizedRequest(['headers', 'x-subject-token'], null, Api.Login, {name:username, password:password}),
    refreshToken: (token)=> FilteredTokenizedRequest(['headers', 'x-subject-token'], token, Api.Login),
    deleteSession: (token)=>FilteredTokenizedRequest('data', token, Api.DeleteSession),
    getSessionExpires: (token)=>FilteredTokenizedRequest(['data','expires'], token, Api.UserOfToken),
},
 apps:{
    create: (token, data) => FilteredTokenizedRequest('data', token, Api.CreateApp, data),
},
}
module.exports = keyrock;