/*
    Ruta: /api/hospitales
*/

// creando las rutas

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getHospitales, crearHospital, actualizarHospital, eliminarHospital } = require('../controllers/hospitales.controllers')


const router = Router();

// obtener todos los hospitales
router.get('/', [
    validarJWT,
],getHospitales)

// crear un hospital
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos,
], crearHospital);

// actualizar un hospital y también se configura sus validaciones en la sección de middleware
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos,
], actualizarHospital)

// eliminar un hospital con id
router.delete('/:id', [
    validarJWT,
], eliminarHospital)


// exportando el router
module.exports = router;