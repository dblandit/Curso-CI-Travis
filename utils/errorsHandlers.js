const moduleError = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        code: 20,
        message: "Ocurrió un error con un módulo interno"
    })
};

const resourceNotFound = (req, res, next) => {
    res.status(404).json({
        code: 12,
        message: {
            description: "Recurso no encontrado",
            documentation_url: "https://facturas.docs.apiary.io/#"
        }
    })
};

module.exports = { moduleError, resourceNotFound };