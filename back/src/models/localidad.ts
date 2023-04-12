"use strict";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * Interfaz. Necesario para implementacion
 */
export interface ILocalidad {
  _id: string;
  id: number;
  nom: string;
  dep: number;
  cp: string;
  ran: number;
}

// Creacion de clase a partir de la interfaz 
const Localidad = new Schema<ILocalidad>({
  _id: { type: String, required: true },
  id: { type: Number, required: true },
  nom: { type: String, required: true },
  dep: { type: Number, required: true },
  cp: { type: String, required: true },
  ran: { type: Number, required: true },
})


// Exportacion de la clase
module.exports = mongoose.model('localidades', Localidad);