/*
    Ruta: /api/usuarios
*/

// creando las rutas

const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario }  = require('../controllers/usuarios.controllers')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

// obtener todos los usuarios
router.get('/', validarJWT, getUsuarios)

// crear un usuario
// en el arreglo se puede colocar tantos MIDDLEWARES como se desee
router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El correo electrónico está vacio o es invalido').isEmail(),
        validarCampos, // es un middleware personalizado
    ], crearUsuario
);

// actualizar un usuario y también se configura sus validaciones en la sección de middleware
router.put('/:id', [
    validarJWT, // Primer middelware para validar el jwt
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    check('email', 'El correo electrónico está vacio o es invalido').isEmail(),
    validarCampos, // es un middleware personalizado
], actualizarUsuario)

// eliminar un usuario con id
router.delete('/:id', validarJWT, eliminarUsuario)


// exportando el router
module.exports = router;