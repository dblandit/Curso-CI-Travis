const Factura = require('../models/Factura');

const getCliente = (req, res, next) => {
    const id = req.params.id;

    Factura.findById(id)
        .then(factura => {
            if (!factura) {
                res.status(404).json({
                    code: 12,
                    message: "Recurso no encontrado"
                })
            } else {
                res.status(200).json({
                    code: 0,
                    message: factura.cliente
                })
            }
        })
        .catch(err => next(err))
};

const patchCliente = (req, res, next) => {
    const id = req.params.id;
    const body = req.body;

    Factura.findById(id)
        .then(factura => {
            if (!factura) {
                return res.status(404).json({
                    code: 12,
                    message: "Recurso no encontrado"
                })
            }

            Object.keys(body).forEach(k => {
                factura.cliente[k] = body[k];
            });

            factura.save()
                .then(modified => {
                    res.status(200).json({
                        code: 0,
                        message: modified
                    })
                })
        })
        .catch(err => next(err))
};

module.exports = { getCliente, patchCliente };