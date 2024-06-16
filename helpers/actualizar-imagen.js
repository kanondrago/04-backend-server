const Usuario = require('../models/usuario.models');
const Hospitales = require('../models/hospital.models');
const Medicos = require('../models/medico.models')
const fs = require('fs');


const actualizarImagen = async (tipo, id, nombreArchivo) => {
    
    switch (tipo) {
        case 'medicos':
            const medico = await Medicos.findById(id);
            if( !medico ) {
                console.log('No es un médico');
                return false
            }

            const pathViejo = `./uploads/medicos/${medico.img}`;
            if(fs.existsSync(pathViejo)){ // verifica si existe el path
                fs.unlinkSync(pathViejo); // con esto borramos la imagen
            }

            medico.img = nombreArchivo;

            // Ahora grabamos en la BBDD
            await medico.save();

            return true;

        break;

        case 'usuario':
            
        break;
        
        case 'hospitales':
        
        break;
        
        default:
            break;
    }


}


module.exports = {
    actualizarImagen
}