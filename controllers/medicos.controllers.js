const { response } = require('express');
const Medico = require('../models/medico.models');
const bcryptjs = require('bcryptjs'); // se almacena todo el resultado del paquete en bcryptjs
const { generarJWT } = require('../helpers/jwt')


const getMedicos = async (req, res = response) => {

  res.json({
    ok: true,
    msg: 'Recibiendo medicos'
  })

}

const crearMedico = async(req, res = response) => {

    res.json({
        ok: true,
        msg: 'creando medicos'
      })
    
}

const actualizarMedico = async (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizando medicos'
      })
    
}

const eliminarMedico = async (req, res=response) => {

    res.json({
        ok: true,
        msg: 'eliminando medicos'
      })
    
}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}