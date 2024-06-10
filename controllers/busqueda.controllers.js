const { response } = require('express');
const Usuario = require('../models/usuario.models');
const Medico = require('../models/medico.models');
const Hospital = require('../models/hospital.models');


const busquedaTodo = async (req, res) => {

    // Parametro en la ruta
    const parametro = req.params.busqueda;
    // Expresión regular para hacer insensible la busqueda con una expresión regular.
    const regexp = new RegExp(parametro, 'i');

    // APLICANDO BUSQUEDAS Y FILTROS

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({nombre: regexp}),
        Medico.find({nombre: regexp}),
        Hospital.find({nombre: regexp})
    ])

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
      })

}

const busquedaDocumentosColeccion = async (req, res) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;

    console.log('tabla: ',tabla)
    console.log('busqueda: ',busqueda)

    const regexp = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({nombre: regexp})
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img')
        break;

        case 'hospitales':
            data = await Hospital.find({nombre: regexp})
                .populate('usuario', 'nombre img')
        break;

        case 'usuarios':
            data = await Usuario.find({nombre: regexp});
        break;
    
        default:
            return res.status(400).json({ // Si no tiene return el servidor se cae
                ok: false,
                msg: 'Se debe enviar /medicos , /hospitales, /usuarios'
            });
    }
    
    res.json({
        ok: true,
        colección: tabla,
        msg: data,
    })

}



module.exports = {
    busquedaTodo,
    busquedaDocumentosColeccion
}