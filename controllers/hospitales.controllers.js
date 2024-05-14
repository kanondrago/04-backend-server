const { response } = require('express');
const Hospital = require('../models/hospital.models');
const bcryptjs = require('bcryptjs'); // se almacena todo el resultado del paquete en bcryptjs
const { generarJWT } = require('../helpers/jwt')


const getHospitales = async (req, res = response) => {

  res.json({
    ok: true,
    msg: 'Recibiendo hospitales'
  })

}

const crearHospital = async(req, res = response) => {

    res.json({
        ok: true,
        msg: 'creando hospitales'
      })
    
}

const actualizarHospital = async (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizando hospitales'
      })
    
}

const eliminarHospital = async (req, res=response) => {

    res.json({
        ok: true,
        msg: 'eliminando hospitales'
      })
    
}



module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}