/*
    Ruta: /api/login
*/

// creando las rutas

const { Router } = require('express');
const { login } = require('../controllers/auth.controllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post('/', 
    [
        check('email', 'El mail es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos, // es un middleware personalizado
    ],
    login,
)







module.exports = router;