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

const crearUsuario = async (req, res) => {
  
  const { email } = req.body;
  const usuario = new Usuario(req.body);


  try {
    const existeEmail = await Usuario.findOne({email: email})


    if(existeEmail){
      res.json({
        ok: false,
        usuario: 'Esta cuenta ya se encuentra registrada'
      })
      return 
    }
  
    usuario.save();
  
    res.json({
      ok: true,
      usuario: usuario
    })
    
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: "Algo fallo en el envio"
    })
  }





}


module.exports = {
    getUsuarios,
    crearUsuario
}