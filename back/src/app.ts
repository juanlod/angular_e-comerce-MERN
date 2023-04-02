"use strict";
// Importacion de librerias
let express = require("express");
let app = express();
let bodyparser = require("body-parser");
let mongoose = require("mongoose");
// Configuracion de puerto. Si no existe se establece el 4201
let port = process.env.PORT || 4201;

let client_route = require("./routes/cliente");

// Conexion a la base de datos
mongoose.connect("mongodb://127.0.0.1:27017/store", function () {
    init();
})
    .catch(function (error) { return console.log(error); });
;
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
app.use(function (req, res, nextFunc) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    nextFunc();
});


app.use('/api', client_route)


// Exportacion del modulo
module.exports = app;
