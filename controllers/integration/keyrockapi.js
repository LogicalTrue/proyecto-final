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
    return TokenizedRequest(token, action, params).
    then((response)=>{
        return FilterByKeys(key, response);
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
    Login: (token=null, data=null)=>({
        baseURL: ApiRoute,
        url: `/auth/tokens`,
        method: 'POST',
        headers: AuthHeader,
        data: token!=null?{token:token}:data
    }),
    GetUsers: (token)=>({
        baseURL: ApiRoute,
        url: `/users`,
        method: 'GET',
        headers: ApiHeader(token)
    }),
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
    CreateUser: (token, body)=>({
        baseURL: ApiRoute,
        url: `/users`,
        method: 'POST',
        headers: ApiHeader(token),
        data: body
        
    }),
    //solo le estas pasando el id, cuando deberia ser el body completo la concha de tu madre
    
     UpdateUser: (token, data)=>({
         baseURL: ApiRoute,
         url: `/users/${data.user.id}`,
         method: 'PATCH',
         headers: ApiHeader(token),
         data: OmitKeys(['user.id'], data),
        
     }),
}
// }
// user: OmitKeys(['id'], data) /// Este omite los datos que no necesitas 
// /user: FilerKeys(['username', 'password', 'admin'], data) ///Este filtra solo lo que queres--__

//Para agregar una nueva funcionalidad respecto a keyrock, configurar aqui, copy y paste
//Luego en api, que esta arriba, solo es ver la documentacion, copiar y pegar o tomar como referencia
//Lo que ya esta creado

const keyrock={
 user:{
    //key, token, action, params
    findAll: (token)=>FilteredTokenizedRequest(['data', "users"], token, Api.GetUsers),
    findOne: (token, id)=>FilteredTokenizedRequest('data', token, Api.GetUser, id),
    findByToken: (token)=>FilteredTokenizedRequest(['data','User'], token, Api.UserOfToken),
    findUserByEmail: (token, username) => FilteredTokenizedRequest(['data', 'users'], token, Api.GetUsers, { username }),

    update: (token, body)=>FilteredTokenizedRequest('data', token, Api.UpdateUser, body),
    
    create: (token, body)=>FilteredTokenizedRequest(['data', 'user'], token, Api.CreateUser, body),
},

 auth:{
    login: (username, password)=>
        FilteredTokenizedRequest(['headers', 'x-subject-token'], null, Api.Login, {name:username, password:password}),
    refreshToken: (token)=>
        FilteredTokenizedRequest(['headers', 'x-subject-token'], token, Api.Login)
},
 apps:{
    create: (token, data) => FilteredTokenizedRequest('data', token, Api.CreateApp, data),
},
}
module.exports = keyrock;