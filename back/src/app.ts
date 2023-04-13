"use strict";
import express, {Request, Response} from 'express';
import bodyparser from 'body-parser'
import mongoose from 'mongoose';
import yamljs from 'yamljs';
import swaggerUi, { SwaggerOptions } from 'swagger-ui-express';
import path from 'path';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

let app = express();
// Configuracion de puerto. Si no existe se establece el 4201
let port = process.env.PORT || 4201;
let client_route = require("./routes/cliente");
let admin_route = require("./routes/admin");
let provincia_route = require("./routes/provincia");
let localidad_route = require("./routes/localidad");

const swaggerFile = path.resolve(__dirname, './openapi.yaml');
const swaggerOptions: SwaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'My API',
        version: '1.0.0',
      },
    },
    apis: ['**/*.ts'],
    yaml: true,
    swagger: '2.0',
    url: 'http://localhost:4201/api-docs',
    filePath: swaggerFile, // <-- aquí se usa la ruta absoluta
  };
  

// Conexion a la base de datos
mongoose.set('strictQuery', false);
try {
    mongoose.connect("mongodb://127.0.0.1:27017/store",  () => {
        init();
    });
} catch (error) {
    console.log(error);
}

function init() {
    console.log("Servidor iniciando");
    // Variable que inicialice el framework
    app.listen(port, function () {
        console.log("Servidor iniciado en el puerto ".concat(port.toString()));
    });
}
// Parseador de datos del front al back
app.use(bodyparser.urlencoded({
    extended: true,
}));

// Cargar el archivo openapi.yaml
const openapiDocument = yamljs.load(swaggerFile);

// Analiza el json
app.use(bodyparser.json({
    limit: '50mb',
    inflate: true,
}));

// CORS configuration
app.use(function (req: Request, res: Response, nextFunc) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    nextFunc();
});


app.use('/api', client_route)
app.use('/api', admin_route)
app.use('/api', provincia_route)
app.use('/api', localidad_route)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

const doc = yaml.load(fs.readFileSync('src/openapi.yaml', 'utf8'));
const apiJson = JSON.stringify(doc);

fs.writeFileSync('../admin-panel/api-json/api.json', apiJson);

// Exportacion del modulo
module.exports = app;

