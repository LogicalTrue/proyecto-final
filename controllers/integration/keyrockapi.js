const axios = require('axios');
const config = require('./config.js');

function TokenizedRequest(token, action, params=null){return params==null? axios(action(token)):axios(action(token, params));}

function FilterByKeys(key, object){
    if(typeof key === 'number' || typeof key === 'string' || key instanceof String ) return object[key]
    else if(Array.isArray(key))
        for(let k of key) 
            if(k in object) object=object[k];
            else break;
    return object;
}
function OmitKeys(keys, object){
    if(Array.isArray(keys))
    for(let k of keys) 
        if(k in object) delete object[k];
        else continue;
    return object;
}
function FilterKeys(keys, object){
    let obj={};
     if(Array.isArray(keys))
     for(let k of keys) 
         if(k in object) obj[k]=object[k];
         else continue;
     return obj;
 }

function FilteredTokenizedRequest(key, token, action, params){
    return (params==null?TokenizedRequest(token, action):TokenizedRequest(token, action, params)).
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
    UpdateUser: (token, data)=>({
        baseURL: ApiRoute,
        url: `/users/${data.id}`,
        method: 'PATCH',
        headers: ApiHeader(token),
        data:{
            user: OmitKeys(['id'], data) /// Este omite los datos que no necesitas 
            ///user: FilerKeys(['username', 'password', 'admin'], data) ///Este filtra solo lo que queres
        }
    }),
}

//Para agregar una nueva funcionalidad respecto a keyrock, configurar aqui, copy y paste
//Luego en api, que esta arriba, solo es ver la documentacion, copiar y pegar o tomar como referencia
//Lo que ya esta creado

const keyrock={
 user:{
    findAll: (token)=>FilteredTokenizedRequest(['data', "users"], token, Api.GetUsers),
    findOne: (token, id)=>FilteredTokenizedRequest('data', token, Api.GetUser, id),
    findByToken: (token)=>FilteredTokenizedRequest(['data','User'], token, Api.UserOfToken),
    update: (token, id)=>FilteredTokenizedRequest('data', token, Api.UpdateUser, id),
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