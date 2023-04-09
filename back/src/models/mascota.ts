"use strict";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * Interfaz de mascota. Necesario para implementacion
 */
export interface IMascota {
  _id: string ;
  idm: number;
  idc: mongoose.Schema.Types.ObjectId;
  nom: string;
  raz: number;
  esp: number;
  fecn: string ;
  pel: number;
  pes: number;
  car: null | string;
  ser: number;
  obs: null | string;
  feci: string ;
  sex: number;
  ped: boolean;
  rep: boolean;
  dec: boolean;
  fot: boolean;
  int: boolean;
  hos: number;
  fult: string;
  tarea: boolean;
  Chip: null | string;
}

// Creacion de clase mascota a traves de la interfaz 
const Mascota = new Schema<IMascota>({
  _id: { type: String, required: true },
  idm: { type: Number, required: true },
  idc: { type: mongoose.Schema.Types.ObjectId, ref: 'cliente', required: true },
  nom: { type: String, required: true },
  raz: { type: Number, required: true },
  esp: { type: Number, required: true },
  fecn: { type: String, required: true },
  pel: { type: Number, required: true },
  pes: { type: Number, required: true },
  car: { type: String, required: false },
  ser: { type: Number, required: true },
  obs: { type: String, required: false },
  feci: { type: String, required: true },
  sex: { type: Number, required: true },
  ped: { type: Boolean, required: true },
  rep: { type: Boolean, required: true },
  dec: { type: Boolean, required: true },
  fot: { type: Boolean, required: true },
  int: { type: Boolean, required: true },
  hos: { type: Number, required: true },
  fult: { type: String, required: true },
  tarea: { type: Boolean, required: true },
  Chip: { type: String, required: false },
})


// Exportacion de la clase
module.exports = mongoose.model('mascota', Mascota);