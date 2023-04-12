'use strict'
import express from 'express';
import { auth } from '../middlewares/authenticate';
import { saveProvince, getProvinces } from '../controllers/ProvinciaController';

const api = express.Router();

// Url vinculada a la funcion save_province del controlador provincia controller
api.post('/provincias/save_provincia', auth, saveProvince)


// Se protege la ruta con la funcion auth
api.get('/provincias/get_provincias',auth ,getProvinces)

module.exports = api;




