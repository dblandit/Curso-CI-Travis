const facturasRouter = require('express').Router();

const { getFacturas, getFactura, postFactura, patchFactura, deleteFactura } = require('./facturasController');
const { postValidators } = require('./facturasValidators');
const { getCliente, patchCliente } = require('../clienteCRUD/clienteController');
const { getItems, postItem, deleteItems } = require('../itemCRUD/itemController');
const { verifyToken } = require('../utils/auth');

facturasRouter.use(verifyToken);

facturasRouter
    .route('/')
    .get(getFacturas)
    .post(postValidators, postFactura);

facturasRouter
    .route('/:id')
    .get(getFactura)
    .patch(patchFactura)
    .delete(deleteFactura);

facturasRouter
    .route('/:id/cliente')
    .get(getCliente)
    .patch(patchCliente);

facturasRouter.get('/:id/items', getItems);
facturasRouter.post('/:id/items', postItem);
facturasRouter.delete('/:id/items', deleteItems);

module.exports = facturasRouter;