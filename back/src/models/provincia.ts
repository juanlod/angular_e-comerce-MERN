"use strict";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * Interfaz. Necesario para implementacion
 */
export interface IProvincia {
  _id: string;
  id: number;
  nom: string;
  Ctel: string;
  ran: number;
}

// Creacion de clase a partir de la interfaz 
const Provincia = new Schema<IProvincia>({
  _id: { type: String, required: true },
  id: { type: Number, required: true },
  nom: { type: String, required: true },
  Ctel: { type: String, required: true },
  ran: { type: Number, required: true },
})


// Exportacion de la clase
module.exports = mongoose.model('provincias', Provincia);