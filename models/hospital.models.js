
// haciendo destructuring
const {Schema, model, Collection} = require('mongoose');

// definición del esquema
const HospitalSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId, // Hay una relación con otro Schema
        ref: 'Usuario',
    }
}, { collection: 'hospitales' }); // Para que aparesca en la base de datos hospitales
// fin definición del esquema

// depurando el modelo para recibir un get
HospitalSchema.method('toJSON', function() {
    const { __v,...object } = this.toObject();

    return object;
})
// fin depurando el modelo para recibir un get


// implementando el modelo
// En la base de datos aparece Usuarios, con una "s" de más 
// mongoose le pone el plural a la colección que vamos a tener en la base de datos
module.exports = model('Hospital', HospitalSchema);
// fin implementando el modelo
