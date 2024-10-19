const { response } = require('express');
const Medico = require('../models/medico.models');
const bcryptjs = require('bcryptjs'); // se almacena todo el resultado del paquete en bcryptjs
const { generarJWT } = require('../helpers/jwt')


const getMedicos = async (req, res = response) => {

  const medicos = await Medico.find()
    .populate('usuario', 'nombre')
    .populate('hospital', 'nombre')

  res.json({
    ok: true,
    msg: medicos
  })

}

const crearMedico = async(req, res = response) => {

    const uid = req.uid

    // Creando la instancia de medico, agregando con destructuración
    const medico = new Medico(
      {usuario: uid,...req.body}
    );

    try {

      const medicoDB = await medico.save();

      res.json({
          ok: true,
          medico: medicoDB
        })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error inesperado  '
      })
    }


    
}

const actualizarMedico = async (req, res = response) => {

    // Extraemos el id de medicos de los parametros del req
    const id = req.params.id;
    // Se tiene acceso al uid del usuario porque pasa por la autenticaión del JWT
    const uid = req.uid;

    try {
      const medico = await Medico.findById(id);

      if(!medico) {
        return res.status(404).json({
          ok: false,
          msg: 'El medico no existe',
        })
      }

      const cambiosMedico = {
        ...req.body,
        usuario: uid,
      }

      const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

      res.status(200).json({
        ok: true,
        msg: 'Actualización de datos del Médico exitosa',
        medico: medicoActualizado,
      })


    } catch (error) {
      console.log(error)
      res.status(500).json({
        ok: true,
        msg: 'Error en la actualización',
      })
    }
    
}

const eliminarMedico = async (req, res=response) => {

    const id = req.params.id;

    try {
      const medico = await Medico.findById(id);
      
      if(!medico) {
        return res.status(404).json({
          ok: false,
          msg: 'El médico no existe',
        })
      }

      // Eliminando el médico, las buenas practicas indican que no se debe eliminar 
      // En su lugar se debe desactivar un estado a modo inactivo
      await Medico.findByIdAndDelete(id);

      res.status(200).json({
        ok: true,
        msg: 'Médico eliminado',
      })

    } catch (error) {
      console.log(error)      
      res.status(500).json({
          ok: false,
          msg: 'Error de procedimiento'
        })
    }
    
}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}