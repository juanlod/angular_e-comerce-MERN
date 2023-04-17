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
  @ApiProperty({ description: 'mongo id' })
  _id: string;

  @ApiProperty({ description: 'sql id' })
  idm: number;

  @ApiProperty({ description: 'client id' })
  idc: number;

  @ApiProperty({ description: 'pet description' })
  nom: string;

  @ApiProperty({ description: 'race id' })
  raz: number;

  @ApiProperty()
  esp: number;

  @ApiProperty({ description: 'birth date' })
  fecn: string;

  @ApiProperty({ description: 'coat id' })
  pel: number;

  @ApiProperty({ description: 'weight' })
  pes: number;

  @ApiProperty()
  car: null | string;

  @ApiProperty()
  ser: number;

  @ApiProperty({ description: 'comments' })
  obs: null | string;

  @ApiProperty({ description: 'register date' })
  feci: string;

  @ApiProperty({ description: 'sex id' })
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

  @ApiProperty({ description: 'last date in clinic' })
  fult: string;

  @ApiProperty()
  tarea: boolean;

  @ApiProperty({ description: 'pet chip number' })
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
