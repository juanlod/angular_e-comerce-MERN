'use strict'
import express from 'express';
import { auth } from '../middlewares/authenticate';
import { login_admin, registro_admin } from '../controllers/AdminController';

// eslint-disable-next-line @typescript-eslint/no-var-requires

// eslint-disable-next-line @typescript-eslint/no-var-requires
const adminController = require('../controllers/AdminController');
const api = express.Router();
// Url vinculada a la funcion registro_admin del controlador admin controller
api.post('/save_admin', auth , registro_admin)
// Login
api.post('/login_admin', login_admin)


module.exports = api;




