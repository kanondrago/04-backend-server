
// haciendo destructuring
const {Schema, model} = require('mongoose');

// definición del esquema
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
});
// fin definición del esquema

// implementando el modelo
// En la base de datos aparece Usuarios, con una "s" de más 
// mongoose le pone el plural a la colección que vamos a tener en la base de datos
module.exports = model('Usuario', UsuarioSchema);
// fin implementando el modelo
