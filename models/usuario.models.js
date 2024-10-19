
// haciendo destructuring
const {Schema, model} = require('mongoose');

// definición del esquema intancia de la clase Schema
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
});
// fin definición del esquema

// depurando el modelo para recibir un get
UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password,...object } = this.toObject();

    // para tener un uid
    object.uid = _id;

    return object;
})
// fin depurando el modelo para recibir un get


// implementando el modelo
// En la base de datos aparece Usuarios, con una "s" de más 
// mongoose le pone el plural a la colección que vamos a tener en la base de datos
module.exports = model('Usuario', UsuarioSchema);
// fin implementando el modelo
