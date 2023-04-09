"use strict";
import mongoose from "mongoose";
import { IUser } from "./user";

const Schema = mongoose.Schema;

/**
 * Interfaz de cliente. Necesario para implementacion
 */
export interface ICliente extends IUser{
  id: string,
  idc: number,
  ayn: string,
  dir: string,
  codp: string,
  codt: string,
  tel: string,
  telC: string,
  email: string,
  obs: string,
  mark: number,
  feci: Date,
  fecu: Date,
  motuv: string,
  deuda: boolean,
  obra: number,
  FaltaMail: boolean,
  FaltaDir: boolean,
  Perfil1: boolean,
  Perfil2: boolean,
  Perfil3: boolean,
  Perfil4: boolean,
  Perfil5: boolean,
  Loc: number,
  Dep: number,
  tel2: string,
  telC2: string,
  codt2: string,
  codp2: string,
  Identif: string,
}

// Creacion de clase cliente a traves de la interfaz 
const Cliente = new Schema<ICliente>({
  idc: { type: Number, required: true },
  ayn: { type: String, required: true },
  dir: { type: String, required: true },
  codp: { type: String, required: false },
  codt: { type: String, required: false },
  tel: { type: String, required: false },
  telC: { type: String, required: false },
  email: { type: String, required: false },
  obs: { type: String, required: false },
  mark: { type: Number, required: true },
  feci: { type: Date, required: true },
  fecu: { type: Date, required: true },
  motuv: { type: String, required: false },
  deuda: { type: Boolean, required: true },
  obra: { type: Number, required: true },
  FaltaMail: { type: Boolean, required: true },
  FaltaDir: { type: Boolean, required: true },
  Perfil1: { type: Boolean, required: true },
  Perfil2: { type: Boolean, required: true },
  Perfil3: { type: Boolean, required: true },
  Perfil4: { type: Boolean, required: true },
  Perfil5: { type: Boolean, required: true },
  Loc: { type: Number, required: true },
  Dep: { type: Number, required: true },
  tel2: { type: String, required: false },
  telC2: { type: String, required: true },
  codt2: { type: String, required: false },
  codp2: { type: String, required: false },
  Identif: { type: String, required: true },
})

// Exportacion de la clase
module.exports = mongoose.model('cliente', Cliente);