const { response } = require('express');
const Usuario = require('../models/usuario.models')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')
const { googleVerify } = require('../helpers/google-verify')


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
            token: token,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado en el login ...'
        })
    }
}


const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;


    try {

        const { name, email, picture } = await googleVerify( googleToken );
        const usuarioDB = await Usuario.findOne({email});

        //creando el usuario
        let usuario;

        // Si el usuario es nuevo se crea uno
        if(!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email: email,
                password: '@@@###',
                img: picture,
                google: true,
            })
        } else {
            // El usuario si existe
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardando el usuario en la base de datos
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            ok: true,
            token: token,
        });
        
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'El token de Google no es correcto'
        })
    }

}

const renewToken = async(req, res = response) => {

    const uid = req.uid;
    
    const token = await generarJWT(uid);

    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        token,
        usuario,
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}