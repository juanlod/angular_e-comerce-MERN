'use strict'
import express from 'express';
import { auth } from '../middlewares/authenticate';

// eslint-disable-next-line @typescript-eslint/no-var-requires

// eslint-disable-next-line @typescript-eslint/no-var-requires
const clienteController = require('../controllers/ClienteController');
const api = express.Router();


// Url vinculada a la funcion registro_cliente del controlador cliente controller
api.post('/registro_cliente', clienteController.registro_cliente)

// Login
api.post('/login_cliente', clienteController.login_cliente)

// Se protege la ruta con la funcion auth
api.get('/listar_clientes_admin_rol', auth, clienteController.listar_clientes_admin_rol)

module.exports = api;




