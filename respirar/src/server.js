const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors({
  origin: 'http://localhost:3001',
}));

// Resto de tu código de servidor

app.listen(3001, () => {
  console.log('Servidor escuchando en el puerto 3001');
});
