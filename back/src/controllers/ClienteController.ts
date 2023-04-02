'use strict'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Cliente = require('../models/cliente');


const registro_cliente = async function(req : any, res : any, next : any) {
    //
    res.status(200).send({message: 'Hello world'});
}
module.exports = {
    registro_cliente
}