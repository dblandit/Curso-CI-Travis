const mongoose = require('mongoose');

const Cliente = require('./schemas/Cliente');
const Item = require('./schemas/Item');

const Factura = new mongoose.Schema({
    nroFactura: { type: Number, unique: true },
    cliente: { type: Cliente },
    condPago: { type: String },
    fechaEmision: { type: Date, default: new Date() },
    fechaVencimiento: { type: Date },
    item: { type: [Item] }
}, {collection: 'facturas'});

module.exports = mongoose.model('Factura', Factura);