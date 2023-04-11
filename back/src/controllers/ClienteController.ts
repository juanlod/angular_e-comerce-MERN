import bcrypt from "bcrypt-nodejs";
import express, { Request, Response } from "express";
import { createUserToken } from "../helpers/jwt";
import {
  countValues, getMultiFilterClients, getSingleFilterClients,
} from "../repositories/clienteRepository";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cliente = require("../models/cliente");
const mascota = require("../models/mascota");


const saveClient = async function (req: any, res: any, next: any) {
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
const loginClient = async (req: Request, res: Response) => {
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
        res.status(200).send({ user: user, token: createUserToken(user) });
      } else {
        res
          .status(400)
          .send({ error: "Usuario o contraseña incorrectos", data: undefined });
      }
    });
  }
};

/**
 * Lista clientes y mascotas. Busca cliente y mascota por nombre, Permite filtro multiple cliente,mascota
 * @param req
 * @param res
 */
const getClients = async (req: Request, res: Response) => {
  // Route validatoe
  if (!req.user || (req.user.rol !== "admin" && req.user.rol !== "user")) {
    res.status(400).send({ error: "NoAccess" });
    return;
  }

  const { filtro, pagina, pageSize } = req.query;
  // If the filter is empty, we use a regular expression that matches everything
  let regex = filtro ? new RegExp(filtro, "i") : /.*/;
  const offset = (pagina - 1) * pageSize;
  let words = [];

  if (filtro) {
    words = filtro.split(",").map((word) => word.trim());
    regex = new RegExp(words.join("|"), "i");
  }

  // Build the pipeline
  const pipeline =
    words.length > 1
      ? getMultiFilterClients(regex, offset, pageSize)
      : getSingleFilterClients(regex, offset, pageSize);

  // Count the results
  const results = await cliente.aggregate(pipeline);

  const count_values = await cliente.aggregate(countValues(regex));

  res.status(200).send({
    data: results,
    pagina_actual: pagina,
    total_paginas: Math.ceil(count_values / pageSize),
    total_resultados: count_values,
  });
};

module.exports = {
  saveClient,
  loginClient,
  getClients,
};
