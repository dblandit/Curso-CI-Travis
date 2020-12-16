module.exports = {
    nroFactura: 1,
    cliente: {
        apellido: 'Un Apellido',
        cuit: 123,
        nombre: 'Un Nombre',
        region: 'CABA'
    },
    condPago: 'Contado',
    fechaEmision: '2020-07-10T00:00:00Z',
    fechaVencimiento: '2020-07-14T00:00:00Z',
    item: [
        {
            cantidad: 2,
            precio: 10,
            producto: 'Arroz'
        },
        {
            cantidad: 4,
            precio: 15,
            producto: 'Fideos'
        }
    ]
}