const Factura = require('../models/Factura');

const { validationResult } = require('express-validator');

const getFacturas = (req, res, next) => {
    const query = req.query || {};

    Factura.find(query).limit(10)
        .then(facturas => {
            res.status(200).json({
                code: 0,
                message: facturas
            });
        })
        .catch(err => next(err))
};

const getFactura = (req, res, next) => {
    const id = req.params.id;

    Factura.findById(id)
        .then(factura => {
            if (!factura) {
                res.status(404).json({
                    code: 12,
                    message: "El recurso no fue encontrado"
                })
            } else {
                res.status(200).json({
                    code: 0,
                    message: factura
                });
            }
        })
        .catch(err => next(err))
};

const postFactura = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            code: 10,
            message: errors.array()
        })
    }

    const body = req.body;

    const newFactura = new Factura({
        nroFactura: body.nroFactura,
        condPago: body.condPago,
        fechaVencimiento: body.fechaVencimiento
    });

    newFactura.save()
        .then(created => {
            res.status(201).json({
                code: 0,
                message: created
            });
        })
        .catch(err => next(err))
};

const patchFactura = (req, res, next) => {
    const id = req.params.id;
    const body = req.body;

    Factura.findById(id)
        .then(factura => {
            if (!factura) {
                res.status(404).json({
                    code: 12,
                    message: "Recurso no encontrado"
                });
            } else {
                Object.keys(body).forEach(k => {
                    factura[k] = body[k];
                });
                factura.save()
                    .then(modified => {
                        res.status(200).json({
                            code: 0,
                            message: modified
                        });
                    })
                    .catch(err => next(err));
            }
        })
};

const deleteFactura = (req, res, next) => {
    const id = req.params.id;

    Factura.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({
                code: 0,
                message: "Factura eliminada correctamente"
            })
        })
        .catch(err => next(err))
};

module.exports = { getFacturas, getFactura, postFactura, patchFactura, deleteFactura };