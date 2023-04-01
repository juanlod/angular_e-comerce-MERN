"use strict";
// Importacion de librerias
var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
// Configuracion de puerto. Si no existe se establece el 4201
var port = process.env.PORT || 4201;

var bodyParser = require("body-parser");

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
app.use(function (res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

// Exportacion del modulo
module.exports = app;
