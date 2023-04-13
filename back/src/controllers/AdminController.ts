
import bcrypt from 'bcrypt-nodejs';
import express, { Request, Response } from "express";
import { createAdminToken } from '../helpers/jwt';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const admin = require("../models/admin");

/**
 * Registro de un admin
 * @param req 
 * @param res 
 * @param next 
 */
export async function registro_admin (req: any, res: any, next: any) {
  //Se reciben los datos del usuario
  let data = req.body;

  let admins = [];
  admins = await admin.find({ email: data.email });

  if (admins.length === 0) {
    // Se almacenan los datos del admin

    if (data.password) {
        // Se encripta la contraseña
      bcrypt.hash(data.password, null, null, async (err, hash) => {
        if (hash) {

          data.password = hash;
          let reg = await admin.create(data);
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
export async function login_admin(req: Request, res: Response) {
  console.log(req)
  let result = req.body;
  let admins = [];

  admins = await admin.find({ email: result.email });

  if (admins.length == 0) {
    res
      .status(400)
      .send({ error: "Usuario o contraseña incorrectos", data: undefined });
  } else {
    let user = admins[0];

    /**
     * Se compara la contraseña hasheada. Check true si coincide, false si no coincide
     */
    bcrypt.compare(result.password, user.password, async (error, check) => {
      if (check) {
        res.status(200).send({ user: user, token: createAdminToken(user)});
      } else {
        res
        .status(400)
        .send({ error: "Usuario o contraseña incorrectos", data: undefined });
      }
    })
  }
};


