const Usuario = require('../models/usuario.models');
const Hospital = require('../models/hospital.models');
const Medico = require('../models/medico.models')
const fs = require('fs');

const borrarImagen= (path) => {
    if(fs.existsSync(path)){ // verifica si existe el path
        fs.unlinkSync(path); // con esto borramos la imagen
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {
    
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if( !medico ) {
                console.log('No es un médico');
                return false
            }

            const pathViejoMedico = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejoMedico);

            medico.img = nombreArchivo;

            // Ahora grabamos en la BBDD
            await medico.save();

            return true;

        break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if( !hospital ) {
                console.log('No es un hospital');
                return false
            }

            const pathViejoHospital = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejoHospital);

            hospital.img = nombreArchivo;

            // Ahora grabamos en la BBDD
            await hospital.save();

            return true;
        break;
        
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if( !usuario ) {
                console.log('No es un usuario');
                return false
            }

            const pathViejoUsuario = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejoUsuario);

            usuario.img = nombreArchivo;

            // Ahora grabamos en la BBDD
            await usuario.save();

            return true;
        break;
        
        default:
            break;
    }


}


module.exports = {
    actualizarImagen
}