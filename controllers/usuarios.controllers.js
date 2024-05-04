const { response } = require('express');

const Usuario = require('../models/usuario.models')

const getUsuarios = async (req, res) => {

  // las llaves vacias especifican un filtro
  // la cadena verifica que columnas quieres devolver de la consulta
  const usuarios = await Usuario.find({}, 'nombre email img role google')

  res.json({
    ok: true,
    usuarios: usuarios
  })

}

const crearUsuario = async(req, res = response) => {

  const { password, email, nombre } = req.body;



  try {
      // validando un usuario
      const existeEmail = await Usuario.findOne({email: email})

      if(existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: 'El correo ya esta registrado'
        })
      }

      // usuario viene de models
      const usuario = new Usuario(req.body);

      // Para grabar en la base de datos
      await usuario.save();

      res.json({
        ok: true,
        usuario: usuario
      })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado ...'
    })
  }
}


module.exports = {
    getUsuarios,
    crearUsuario
}