'use strict';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Interfaz de sexo. Necesario para implementacion
 */
export interface ISpecies extends Document {
  _id: string;
  id: number;
  nom: string;
  ali: number;
  icon: string;
}

export class Species {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  nom: string;

  @ApiProperty()
  ali: number;

  @ApiProperty()
  icon: string;
}

// Creacion de clase sexo a traves de la interfaz
export const SpeciesSchema = new Schema<ISpecies>({
  _id: { type: String, required: true },
  id: { type: Number, required: true },
  nom: { type: String, required: true },
  ali: { type: Number, required: true },
  icon: { type: String, required: false },
});
