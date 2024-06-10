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

    // switch (tabla) {
    //     case 'medicos':
            
    //         break;

    //     case 'hospitales':
            
    //         break;
    //     case 'usuarios':
            
    //         break;
    
    //     default:
    //         res.status(400).json({
    //             ok: false,
    //             msg: 'Se debe enviar /medicos , /hospitales, /usuarios'
    //         })
    // }



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



module.exports = {
    busquedaTodo,
    busquedaDocumentosColeccion
}