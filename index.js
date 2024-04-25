
require('dotenv').config(); // PARA LAS VARIABLES DE ENTORNO

const express = require('express');
const cors = require('cors'); // Para aceptar peticiones de diferentes dominios
const {dbConnection} = require('./database/config');


// Creación de Express
const app = express()

// Configurar CORS - Es un MiddleWare
// Para configurar de que dominio queremos recibir peticiones
// Creación de lista blancas y negras
app.use( cors() );

// Base de datos
dbConnection();


// Petición
// awENMcQ8wwiqyNxg
// mean_user

// Rutas
app.get('/', (req, res) => {
  res.json({
    ok: true,
    msg: 'Holaaaa'
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})