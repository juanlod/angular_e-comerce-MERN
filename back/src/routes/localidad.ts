'use strict'
import express from 'express';
import { auth } from '../middlewares/authenticate';
import { saveLocalidad, getLocalidades } from '../controllers/LocalidadController';

const api = express.Router();

// Url vinculada a la funcion save_province del controlador Localidad controller
api.post('/localidades/save_localidad', auth, saveLocalidad)


// Se protege la ruta con la funcion auth
api.get('/localidades/get_localidades', auth, getLocalidades)

module.exports = api;




