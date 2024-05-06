/*
    Ruta: /api/usuarios
*/

// creando las rutas

const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios,crearUsuario }  = require('../controllers/usuarios.controllers')
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

// obtener los usuarios
router.get('/', getUsuarios)

// crear usuarios
// en el arreglo se puede colocar tantos MIDDLEWARES como se desee
router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El correo electrónico está vacio o es invalido').isEmail(),
        validarCampos, // es un middleware personalizado
    ], crearUsuario
);

// exportando el router
module.exports = router;