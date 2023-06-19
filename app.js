const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const router = express.Router();

const app = express();
// Constants
const PORT = 3001;
const HOST = '0.0.0.0';

// Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
  extended: true
}));

//app.use(cors());
const config_sessions = {
  secret: require('crypto').randomBytes(20).toString('hex'),
  saveUninitialized:true,
  cookie: { maxAge: 60*60*1000 },
  resave: false
}
app.use(cookieParser(config_sessions.secret));
app.use(sessions(config_sessions));
  
// Rutas de la API

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocurrió un error en el servidor' });
});


// Iniciar el servidor
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

app.use('/api', require('./routes/apiRoutes'));


app.use(express.static(__dirname + '/respirar/build'));
app.get('*', (req,res) =>{
  res.sendFile(__dirname+'/respirar/build/index.html');
});


module.exports = app