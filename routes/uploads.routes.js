/*
    Ruta: /api/uploads
*/

// creando las rutas

const { Router } = require('express');
// Implementando un middleware
const expressFileUpload = require('express-fileupload');
const { uploadsFile } = require('../controllers/uploads.controller')
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();
router.use( expressFileUpload() );// disparando el middleware fileUpload


router.put('/:tipo/:id', [validarCampos], uploadsFile);

module.exports = router;

