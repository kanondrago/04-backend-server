/*
    Ruta: /api/login
*/

// creando las rutas

const { Router } = require('express');
const { login, googleSignIn, renewToken } = require('../controllers/auth.controllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();


router.post('/', 
    [
        check('email', 'El mail es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos, // es un middleware personalizado
    ],
    login,
)

// EndPoint para verificar una ruta
router.post('/google', 
    [
        check('token', 'El token de google es obligatorio').not().isEmpty(),
        validarCampos, // es un middleware personalizado
    ],
    googleSignIn,
)

// EndPoint para validad el Token
router.get('/renew', 
    validarJWT, 
    renewToken,
);




module.exports = router;