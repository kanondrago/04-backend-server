/*
    Ruta: /api/uploads
*/

// creando las rutas

const { Router } = require('express');
// Implementando un middleware
const expressFileUpload = require('express-fileupload');
const { uploadsFile, retornaImagen } = require('../controllers/uploads.controller')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();
// Antes de que se ejecute el put 
router.use( expressFileUpload() );// disparando el middleware fileUpload


router.put('/:tipo/:id', [validarJWT, validarCampos], uploadsFile);

router.get('/:tipo/:picture', [validarCampos], retornaImagen);

module.exports = router;

