
// haciendo destructuring
const { Schema, model } = require('mongoose');

// definición del esquema
const MedicoSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    img: {
        type: String,
    },
    hospital: {
        type: Schema.Types.ObjectId, // Hay una relación con otro Schema
        ref: 'Hospital',
    }
});
// fin definición del esquema

// depurando el modelo para recibir un get
MedicoSchema.method('toJSON', function() {
    const { __v,...object } = this.toObject();

    return object;
})
// fin depurando el modelo para recibir un get


module.exports = model('Medico', MedicoSchema);
// fin implementando el modelo
