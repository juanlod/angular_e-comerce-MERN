"use strict";
import express, {Request, Response} from 'express';
import bodyparser from 'body-parser'
import mongoose from 'mongoose';


let app = express();
// Configuracion de puerto. Si no existe se establece el 4201
let port = process.env.PORT || 4201;
let client_route = require("./routes/cliente");
let admin_route = require("./routes/admin");

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

// Analiza el json
app.use(bodyparser.json({
    limit: '50mb',
    extended: true,
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


// Exportacion del modulo
module.exports = app;
