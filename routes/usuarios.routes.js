/*
    Ruta: /api/usuarios
*/

// creando las rutas

const { Router } = require('express');
const { getUsuarios,crearUsuario }  = require('../controllers/usuarios')

const router = Router();

// obtener los usuarios
router.get('/', getUsuarios)

// crear usuarios
router.post('/', crearUsuario);

// exportando el router
module.exports = router;