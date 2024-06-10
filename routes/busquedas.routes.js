/*
    Ruta: /api/todo
*/

// creando las rutas

const { Router } = require('express');
const { login } = require('../controllers/auth.controllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { busquedaTodo, busquedaDocumentosColeccion }  = require('../controllers/busqueda.controllers')


const router = Router();


router.get('/:busqueda', [
    validarJWT
], busquedaTodo)

router.get('/coleccion/:tabla/:busqueda', [
    validarJWT
], busquedaDocumentosColeccion)

module.exports = router;