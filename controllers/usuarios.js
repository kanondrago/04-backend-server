const Usuario = require('../models/usuario')

const getUsuarios = (req, res) => {
  res.json({
    ok: true,
    usuarios: 'get usuarios'
  })
}

const crearUsuario = async(req, res) => {

  const { password, email, nombre } = req.body;

  // usuario viene de models
  const usuario = new Usuario(req.body);

  // Para grabar en la base de datos
  await usuario.save();


  res.json({
    ok: true,
    usuario: usuario
  })
}


module.exports = {
    getUsuarios,
    crearUsuario
}