const { response } = require('express');
const Usuario = require('../models/usuario.models');
const bcryptjs = require('bcryptjs'); // se almacena todo el resultado del paquete en bcryptjs
const { generarJWT } = require('../helpers/jwt')


const busquedaTodo = async (req, res) => {

    const parametro = req.params.busqueda;

    console.log(parametro);

    res.json({
        ok: true,
        parametro: parametro
      })

}

module.exports = {
    busquedaTodo
}