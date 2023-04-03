import bcrypt from "bcrypt-nodejs";
import express, { Request, Response } from "express";
import { createToken } from "../helpers/jwt";


// eslint-disable-next-line @typescript-eslint/no-var-requires
const cliente = require("../models/cliente");

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
        res.status(200).send({ user: user, token:  createToken(user) });
      } else {
        res
        .status(400)
        .send({ error: "Usuario o contraseña incorrectos", data: undefined });
      }
    })
  }
};

module.exports = {
  registro_cliente,
  login_cliente,
};

