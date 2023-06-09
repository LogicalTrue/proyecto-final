const config={};
const dotenv = require('dotenv');
dotenv.config();
config.authorization = {
    level: 'Basic', // Opciones: (Basic | Payload | Advanced)
  };
  
  // Configuracion de los parametros de la api
  // no se recomienda tocar, los cambios
  // se realizan en el archivo .env

  config.api = {
    debug:true,
    server:process.env.KEYROCK_API_URL,
    client:process.env.KEYROCK_CLIENT_ID,
    secret:process.env.KEYROCK_CLIENT_SECRET,
    route:'v1',
  };

  // Transforma (clientid + clientsecret) en un base 64 
  // (es para validar el usuario) posteriormente 
  // con esta combinacion (es parte de la docu)
  
  config.api.authorization= `${config.authorization.level} ` + Buffer.from(config.api.client +":"+config.api.secret).toString('base64');

  module.exports = config;