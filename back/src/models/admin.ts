"use strict";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * Interfaz de admin. Necesario para implementacion
 */
export interface IAdmin{
  nombres: string,
  apellidos:  string,
  email:  string,
  password: string,
  telefono?: string,
  rol?: string,
  f_nacimiento?: string,
  dni?: string,
} 

// Creacion de clase admin a traves de la interfaz 
const adminSchema = new Schema<IAdmin>({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  telefono: { type: String, required: true },
  rol: { type: String, required: false },
  dni: { type: String, required: false },
})

// Exportacion de la clase
module.exports = mongoose.model('admin', adminSchema);