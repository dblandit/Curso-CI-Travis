require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { loginController } = require('./utils/auth');
const { resourceNotFound, moduleError } = require('./utils/errorsHandlers');

const facturasRouter = require('./facturasCRUD/facturasRouter');

const app = express();

app.use(bodyParser.json());

app.post('/login', loginController);
app.use('/facturas', facturasRouter);

app.get('/', (req, res) => { res.status(200).json({ message: "Hola mundo" }) });

app.use(resourceNotFound);
app.use(moduleError);

module.exports = app;