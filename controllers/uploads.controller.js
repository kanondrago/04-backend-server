
const { response } = require('express');

// uuid -> para generar nombres de imagenes
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

// Sirve para construir path completos
const path = require('path');
const fs = require('fs');


const uploadsFile = async (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales', 'usuarios', 'medicos'];

    if(!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es ni medico ni usuario ni hospital',
        })
    }
    
    // Validar que exista un archivo (usamos el middleware fileupload ejecutado en uploads.router.js)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se envio ningun archivo',
        });
    }

    // procesar una imagen
    // tenemos acceso a las imagenes debido al middleware --> fileupload
    const file = req.files.imagen; // imagen tiene el nombre colocado en el body en files

    const nombreCortado = file.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1]

    // extensiones Validas
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if(!extensionesValidas.includes(extension)) {
        return res.status(400).json({
            ok: false,
            msg: 'El archivo no tiene una extensión valida',
        });
    }

    // Generar el nombre del archivo --> (importantes el uuid --> identificador de imagenes)
    const nombreArchivo = `${uuidv4()}.${extension}`;

    // Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen',
            });
        }

        // Actualizar la BBDD
        actualizarImagen(tipo, id, nombreArchivo);
    
        return res.status(200).json({
            ok: true,
            msg: 'Archivo subido',
            id,
            tipo,
            nombreArchivo,
        });      
    });
}

const retornaImagen = ( req, res = response ) => {
    const tipo = req.params.tipo;
    const picture = req.params.picture;

    const pathPicture = path.join(__dirname, `../uploads/${tipo}/${picture}`)

    // imagen por defecto
    if(fs.existsSync(pathPicture)) {
        res.sendFile(pathPicture);
    } else {
        const pathPicture = path.join(__dirname, `../uploads/no-img.jpg`)
        res.sendFile(pathPicture);
    }


}

module.exports = {
    uploadsFile,
    retornaImagen,
}