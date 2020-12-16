const mongoose = require('mongoose');

const Item = new mongoose.Schema({
    cantidad: { type: Number },
    precio: { type: Number },
    producto: { type: String }
}, { _id: false });

module.exports = Item;