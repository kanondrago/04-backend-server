
const {Schema, model} = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        type: String,
        required: true
    },
    hospital: {
        type: String,
    },
});

module.exports = model('Medico', MedicoSchema);
