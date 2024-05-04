
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

// lectura y parseo del body para leer los requests (Middleware)
// Colocar antes de las rutas
app.use(express.json());


// Base de datos
dbConnection();


// Petición
// awENMcQ8wwiqyNxg
// mean_user

/*
  RUTAS
*/
// definiendo un middleware
app.use('/api/usuarios', require('./routes/usuarios.routes'));

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})