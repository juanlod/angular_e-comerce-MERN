"use strinct";
import jwt from "jwt-simple";
import moment from "moment";
import { IUser } from "../models/user";
import { IAdmin } from "../models/admin";
import { environment } from "../environments/environment";


export function createUserToken(user: IUser) {
  let payload = {
    sub: user.id,
    nombre: user.nombres,
    apellido: user.apellidos,
    email: user.email,
    created_date: moment().unix(),
    expiration_date: moment().add(7, "days").unix(), // 7 dias de duracion
  };
  return jwt.encode(payload, environment.secret);
}

export function createAdminToken(user: IAdmin) {
  let payload = {
    sub: user.id,
    nombre: user.nombres,
    apellido: user.apellidos,
    email: user.email,
    created_date: moment().unix(),
    expiration_date: moment().add(7, "days").unix(), // 7 dias de duracion
    rol: user.rol,
  };

  return jwt.encode(payload, environment.secret);
}
