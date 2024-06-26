const { response } = require('express');
const Usuario = require('../models/usuario.models')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // verificación de email
        const usuarioDB = await Usuario.findOne({email: email});

        if(!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Email no valida'
            })
        }
        // fin verificación de email


        // verificación de contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password no valida'
            })
        }
        // fin verificación de contraseña


        // generación de un token - JWT (Json Web Token)
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            msg: token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado en el login ...'
        })
    }
}

module.exports = {
    login,
}