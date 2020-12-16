const { check } = require('express-validator');
const Factura = require('../models/Factura');

const postValidators = [
    check('nroFactura').isNumeric().withMessage("El campo nroFactura debe ser numérico")
        .custom(value => {
            return Factura.findOne({nroFactura: value})
                .then(factura => {
                    return factura ? Promise.reject("El nroFactura indicado ya existe") : Promise.resolve()
                })
        }),
    check('condPago').exists().withMessage("El campo condPago debe ser ingresada"),
    check('fechaVencimiento').isISO8601("El campo fechaVencimiento debe respetar el formato de fechas ISO8601")
];

module.exports = { postValidators };