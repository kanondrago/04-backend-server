/*
    Ruta: /api/medicos
*/

// creando las rutas

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedicos, crearMedico, actualizarMedico, eliminarMedico } = require('../controllers/medicos.controllers')


const router = Router();

// obtener todos los medicos
router.get('/', getMedicos)

// crear medico
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
    check('hospital', 'El hospital debe ser un id de Mongo válido').isMongoId(), // id de MONGO
    validarCampos,
], crearMedico);

// actualizar un medico y también se configura sus validaciones en la sección de middleware
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
    validarCampos,
], actualizarMedico)

// eliminar un medico con id
router.delete('/:id', [
    validarJWT,
],eliminarMedico)


// exportando el router
module.exports = router;