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

    const uid = req.uid;

    const hospital = new Hospital({
      usuario: uid,...req.body
    }); // se desestructura para agregar el usuario a la variable hospital.    
    
    try {
      const hospitalDB = await hospital.save();
      
      res.json({
          ok: true,
          hospital: hospitalDB
        })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error inesperado ...'
      })
    }

    
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