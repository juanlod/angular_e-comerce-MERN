
import express, { Request, Response } from "express";


// eslint-disable-next-line @typescript-eslint/no-var-requires
const localidad = require("../models/localidad");

/**
 * Login
 * @param req
 * @param res
 */

export async function saveLocalidad(req: Request, res: Response) {
  let result = req.body;
  const localidadExist = await localidad.findOne({ nom: result.nom });

  if (localidadExist) {
    res
      .status(400)
      .send({ error: "La localidad ya existe", data: undefined });
      return;
  } 
  let reg = await localidad.create(result);
  res.status(200).send({ data: reg });

};

/**
 * Lista Localidads
 * @param req
 * @param res
 */
export async function getLocalidades(req: Request, res: Response) {
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

  // Get and count the results
  const results = await localidad.find({nom: regex});

  res.status(200).send({
    data: results,
    pagina_actual: pagina,
    total_paginas: Math.ceil(results.length / pageSize),
    total_resultados: results.length
  });
};
