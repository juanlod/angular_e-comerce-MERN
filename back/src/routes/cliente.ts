'use strict'
import express from 'express';
import { auth } from '../middlewares/authenticate';
import { getClients, loginClient, saveClient } from '../controllers/ClienteController';

// eslint-disable-next-line @typescript-eslint/no-var-requires

// eslint-disable-next-line @typescript-eslint/no-var-requires

const api = express.Router();


// Url vinculada a la funcion registro_cliente del controlador cliente controller
api.post('/save_client', auth, saveClient)

// Login
api.post('/login_client', loginClient)

// Se protege la ruta con la funcion auth
api.get('/get_clients', auth, getClients)

module.exports = api;




