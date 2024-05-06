const { response } = require('express');
const Usuario = require('../models/usuario.models');
const bcryptjs = require('bcryptjs'); // se almacena todo el resultado del paquete en bcryptjs


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

  const { password, email } = req.body;

  try {
      // validando un usuario -> Busca un usuario en la base de datos
      const existeEmail = await Usuario.findOne({email: email})

      if(existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: 'El correo ya esta registrado'
        })
      }
      // usuario viene de models
      const usuario = new Usuario(req.body);

      // encriptar contraseña
      const salt = bcryptjs.genSaltSync(); // creando la salt
      usuario.password = bcryptjs.hashSync(password, salt); // encriptando con el password y la salt
      // fin encriptar contraseña

      // Para guardar al usuario en la base de datos
      await usuario.save();

      res.json({
        ok: true,
        usuario: usuario
      })

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado ...'
    })
  }
}

const actualizarUsuario = async (req, res = response) => {

  // TODO: Validar token y comprobar si es el usuario correcto

  // obteniendo el id que se envio del lado del cliente
  // ejemplo en la url: localhost:3000/api/usuarios/6638a528435008fa427b4c6d
  const uid = req.params.id;

  try {

    // Busca por id al usuario de la base de datos
    const usuarioDB = await Usuario.findById(uid);

    if(!usuarioDB){
      return res.status(404).json({
        ok: false,
        msg: 'El usuario no existe...'
      })
    }



    // Actualizaciones
    const campos = req.body

    if(usuarioDB.email === req.body.email){
      delete campos.email
    }
    else {
      // Aca verificamos un usuario con el mismo correo electrónico
      const existeEmail = await Usuario.findOne({ email: req.body.email });

      if(existeEmail){
        // Si el mail existe en la base de datos, aquí se termina el código y envia un mensaje al cliente
        return res.json({
          ok: false,
          msg: 'El correo electrónico ya esta registrado en la base de datos'
        })
      }
    }

    // Borrando los campos que no queremos que se modifiquen
    delete campos.password;
    delete campos.google;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

    res.json({
      ok: true,
      usuario: usuarioActualizado
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...'
    })
  }


}


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario
}