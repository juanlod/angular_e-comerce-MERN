import bcrypt from "bcrypt-nodejs";
import express, { Request, Response } from "express";
import { createUserToken } from "../helpers/jwt";


// eslint-disable-next-line @typescript-eslint/no-var-requires
const cliente = require("../models/cliente");
const mascota = require("../models/mascota");

const registro_cliente = async function (req: any, res: any, next: any) {
  //Se reciben los datos del usuario
  let data = req.body;

  let clientes = [];
  clientes = await cliente.find({ email: data.email });

  if (clientes.length === 0) {
    // Se almacenan los datos del cliente

    if (data.password) {
      // Se encripta la contraseña
      bcrypt.hash(data.password, null, null, async (err, hash) => {
        if (hash) {
          data.password = hash;
          let reg = await cliente.create(data);
          res.status(200).send({ data: reg });
        }
      });
    } else {
      res
        .status(400)
        .send({ error: "Debe especificar una contraseña", data: undefined });
    }
  } else {
    res.status(400).send({ error: "El correo ya existe", data: undefined });
  }
};

/**
 * Login 
 * @param req
 * @param res
 */
const login_cliente = async (req: Request, res: Response) => {
  let result = req.body;
  let clientes = [];

  clientes = await cliente.find({ email: result.email });

  if (clientes.length == 0) {
    res
      .status(400)
      .send({ error: "Usuario o contraseña incorrectos", data: undefined });
  } else {
    let user = clientes[0];

    /**
     * Se compara la contraseña hasheada. Check true si coincide, false si no coincide
     */
    bcrypt.compare(result.password, user.password, async (error, check) => {
      if (check) {
        res.status(200).send({ user: user, token:  createUserToken(user) });
      } else {
        res
        .status(400)
        .send({ error: "Usuario o contraseña incorrectos", data: undefined });
      }
    })
  }
};


/**
 * Lista clientes y mascotas. Busca cliente y mascota por nombre, Permite filtro multiple cliente,mascota
 * @param req 
 * @param res 
 */
const listar_clientes_admin_rol = async (req: Request, res: Response) => {

  const { filtro, pagina, pageSize } = req.query;
  let regex = filtro ? new RegExp(filtro, "i") : /.*/; // Si el filtro está vacío, usamos una expresión regular que coincida con todo
  const offset = (pagina - 1) * pageSize;
  let palabras = [];

  if (filtro) {
    palabras = filtro.split(",").map(palabra => palabra.trim());
    regex = new RegExp(palabras.join("|"), "i");
  }

  const pipeline = [
    {
      "$lookup": {
        "localField": "idc",
        "from": "mascotas",
        "foreignField": "idc",
        "as": "mascotas"
      }
    },
    {
      "$match": { 
        $or: [
          { "ayn": regex },
          { "mascotas.nom": regex }
        ]
      }
    },
    {
      "$sort": {
          "mascotas.nom": 1,
          ayn: 1
      }
  },
    {
      "$skip": offset
    },
    {
      "$limit":  parseInt(pageSize),
    }
  
  ];

  const resultados = await cliente.aggregate(pipeline);

  const queryCliente =  { ayn: regex };
  const queryMascota = { nom:  regex };

  const total_resultadosCliente = await cliente.countDocuments(queryCliente);
  const total_resultadosMascota= await mascota.countDocuments(queryMascota);
  const total_resultados = total_resultadosCliente ? total_resultadosCliente : total_resultadosMascota;

  res.status(200).send({ 
    data: resultados,
    pagina_actual: pagina,
    total_paginas: Math.ceil((total_resultados) / pageSize),
    total_resultados: (total_resultados)
  });
}


module.exports = {
  registro_cliente,
  login_cliente,
  listar_clientes_admin_rol
};

