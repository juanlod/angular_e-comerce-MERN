'use strict';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Interfaz de mascota. Necesario para implementacion
 */
export interface IPet extends Document {
  _id: string;
  idm: number;
  idc: mongoose.Schema.Types.ObjectId;
  nom: string;
  raz: number;
  esp: number;
  fecn: string;
  pel: number;
  pes: number;
  car: null | string;
  ser: number;
  obs: null | string;
  feci: string;
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

export class Pet {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  idm: number;
  @ApiProperty()
  idc: mongoose.Schema.Types.ObjectId;
  @ApiProperty()
  nom: string;
  @ApiProperty()
  raz: number;
  @ApiProperty()
  esp: number;
  @ApiProperty()
  fecn: string;
  @ApiProperty()
  pel: number;
  @ApiProperty()
  pes: number;
  @ApiProperty()
  car: null | string;
  @ApiProperty()
  ser: number;
  @ApiProperty()
  obs: null | string;
  @ApiProperty()
  feci: string;
  @ApiProperty()
  sex: number;
  @ApiProperty()
  ped: boolean;
  @ApiProperty()
  rep: boolean;
  @ApiProperty()
  dec: boolean;
  @ApiProperty()
  fot: boolean;
  @ApiProperty()
  int: boolean;
  @ApiProperty()
  hos: number;
  @ApiProperty()
  fult: string;
  @ApiProperty()
  tarea: boolean;
  @ApiProperty()
  Chip: null | string;
}

// Creacion de clase mascota a traves de la interfaz
export const PetSchema = new Schema<IPet>({
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
});

// // Exportacion de la clase
// module.exports = mongoose.model('mascotas', Mascota);
