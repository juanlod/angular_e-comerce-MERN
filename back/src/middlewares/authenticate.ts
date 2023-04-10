"use strict";
import jwt from "jwt-simple";
import moment from "moment";
import { environment } from "../environments/environment";

const Errors = {
    NO_HEADERS: "NoHeadersError",
    INVALID_TOKEN: "InvalidToken",
    EXPIRED_TOKEN: "TokenExpirado"
  };
  
/**
 * Protector de rutas
 * @param req
 * @param res
 * @param nextFunc
 */
  export function auth(req: any, res: any, nextFunc: any) {
    let isValid = true;
    let error = "";
  
    if (!req.headers.authorization) {
      isValid = false;
      error = Errors.NO_HEADERS;
    }
  
    let token = req.headers.authorization.replace('Bearer ', '').replace(new RegExp(/['"]+/g, ""));
    let segment = token.split(".");
  
    if (segment.length !== 3) {
      isValid = false;
      error = Errors.INVALID_TOKEN;
    }
  
    let payload = null;
    try {
  
      payload = jwt.decode(token, environment.secret);
      if (payload.expiration_date <= moment().unix()) {
        isValid = false;
        error = Errors.EXPIRED_TOKEN;
      }
  
    } catch (err) {
      isValid = false;
      error = Errors.INVALID_TOKEN;
    }
  
    if (!isValid) {
      return res.status(403).send({ error });
    }
  
    // El user se validará en las peticiones
    req.user = payload;
    nextFunc();
  }