'use strict'
import express from 'express';

// eslint-disable-next-line @typescript-eslint/no-var-requires

// eslint-disable-next-line @typescript-eslint/no-var-requires
const adminController = require('../controllers/AdminController');
const api = express.Router();
// Url vinculada a la funcion registro_admin del controlador admin controller
api.post('/registro_admin', adminController.registro_admin)
// Login
api.post('/login_admin', adminController.login_admin)


module.exports = api;




