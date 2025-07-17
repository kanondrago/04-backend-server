const { response } = require('express');
const Hospital = require('../models/hospital.models');
const Usuario = require('../models/usuario.models');
const bcryptjs = require('bcryptjs'); // se almacena todo el resultado del paquete en bcryptjs
const { generarJWT } = require('../helpers/jwt')


const getHospitales = async (req, res = response) => {

  // populate --> para tener mayor granularidad de los datos.
  const hospitales = await Hospital.find()
    .populate('usuario', 'nombre email role img password')

  res.json({
    ok: true,
    hospitales: hospitales,
  })

}

const crearHospital = async(req, res = response) => {

    const uid = req.uid;

    console.log('uid: ',uid)

    // se desestructura para agregar el usuario al objeto hospital.    
    const hospital = new Hospital({
      usuario: uid,...req.body
    });
    
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

    // Extraemos el id de los parametros del req
    const id = req.params.id;
    // Se tiene acceso al uid porque pasa por la autenticaión del JWT
    const uid = req.uid;


    try {

      // Encontramos si hay en la base de datos
      const hospital = await Hospital.findById(id);

      if(!hospital) {
        return res.status(400).json({
          ok: false,
          msg: 'Hospital no encontrado',
        })      
      }

      // Metodo 1 de actualizar un campo 
      // hospital.nombre = req.body.nombre;

      // Metodo 2 si hay varios campos para actualizar
      const cambiosHospital = {
        ...req.body,
        usuario: uid,
      }

      // Ahora guardamos en la base de datos ....XD
      const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

      res.json({
          ok: true,
          msg: 'actualizando hospitales',
          hospital: hospitalActualizado,
        })

    } catch (error) {
      console.log(error)
      res.status(500).json({
        ok: false,
        msg: 'Hablar con el administrador',
      })
    }

    
}

const eliminarHospital = async (req, res=response) => {

    const id = req.params.id;
    
    try {

      const hospital = await Hospital.findById(id);

      if(!hospital){
        return res.status(404).json({
          ok: true,
          msg: 'Hospital no encontrado, no se pudo eliminar el hospital '
        })
      }

      // Eliminando el hospital por un id generico
      // Esto actualiza la base de datos
      await Hospital.findByIdAndDelete(id);

      res.json({
        ok: true,
        msg: 'Hospital eliminado',
      });
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error, contacto con el administrador'
      })
    }
    
}


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}