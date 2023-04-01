'use strict'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const _express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const clienteController = require('../controllers/ClienteController');


const api = _express.Router();

// Url vinculada a la funcion registro_cliente del controlador cliente controller
api.post('/registro_cliente', clienteController.registro_cliente)


module.exports = api;




