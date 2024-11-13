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
            token: token
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

    try {

        const token = req.body.token;

        console.log('token: ', token)

        const googleUser = await googleVerify(token);

        const {email, name, picture} = googleUser;
    
        res.json({
            ok: true,
            msg: googleUser,
            email: email,
            name: name,
            picture: picture,
            token: token,
        })
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Token de Google no es correcto'
        })
    }

}

const renewToken = async(req, res = response) => {

    const uid = req.id;
    const token = await generarJWT(uid);

    res.json({
        ok: true,
        uid,
        token,
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}