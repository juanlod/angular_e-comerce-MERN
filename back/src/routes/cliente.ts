'use strict'
import express from 'express';
import { auth } from '../middlewares/authenticate';

// eslint-disable-next-line @typescript-eslint/no-var-requires

// eslint-disable-next-line @typescript-eslint/no-var-requires
const clienteController = require('../controllers/ClienteController');
const api = express.Router();


// Url vinculada a la funcion registro_cliente del controlador cliente controller
api.post('/save_client', clienteController.saveClient)

// Login
api.post('/login_client', clienteController.loginClient)

// Se protege la ruta con la funcion auth
api.get('/get_clients', auth, clienteController.getClients)

module.exports = api;




