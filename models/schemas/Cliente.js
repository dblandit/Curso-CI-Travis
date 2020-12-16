const mongoose = require('mongoose');

const Cliente = new mongoose.Schema({
    apellido: { type: String },
    cuit: { type: Number },
    nombre: { type: String },
    region: { type: String }
});

module.exports = Cliente;