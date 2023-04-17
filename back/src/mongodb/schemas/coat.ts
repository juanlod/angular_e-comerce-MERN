'use strict';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Interfaz de pelaje. Necesario para implementacion
 */
export interface ICoat extends Document {
  _id: string;
  id: number;
  nom: string;
}

export class Coat {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  nom: string;
}

// Creacion de clase pelaje a traves de la interfaz
export const CoatSchema = new Schema<ICoat>({
  _id: { type: String, required: true },
  id: { type: Number, required: true },
  nom: { type: String, required: true },
});
