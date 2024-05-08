const { response } = require('express');
const Usuario = require('../models/usuario.models')
const bcrypt = require('bcryptjs');


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

        // generación de un token - JWT (Json Web Token)


        res.json({
            ok: true,
            msg: usuarioDB
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