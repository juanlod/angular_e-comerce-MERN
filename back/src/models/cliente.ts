"use strict";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * Interfaz de cliente. Necesario para implementacion
 */
export interface ICliente {
  nombres: string,
  apellidos:  string,
  pais?: string,
  email:  string,
  password: string,
  perfil: string,
  telefono?: string,
  genero?: string,
  f_nacimiento?: string,
  dni?: string,
} 

// Creacion de clase cliente a traves de la interfaz 
const clienteSchema = new Schema<ICliente>({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  pais: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  perfil: { type: String, default: "perfil.png", required: true },
  telefono: { type: String, required: false },
  genero: { type: String, required: false },
  f_nacimiento: { type: String, required: false },
  dni: { type: String, required: false },
})

// Exportacion de la clase
module.exports = mongoose.model('cliente', clienteSchema);