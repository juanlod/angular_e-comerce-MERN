'use strict';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Interfaz. Necesario para implementacion
 */
export interface ILocality extends Document {
  _id: string;
  id: number;
  nom: string;
  dep: number;
  cp: string;
  ran: number;
}

export class Locality {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  id: number;
  @ApiProperty()
  nom: string;
  @ApiProperty()
  dep: number;
  @ApiProperty()
  cp: string;
  @ApiProperty()
  ran: number;
}

// Creacion de clase a partir de la interfaz
export const LocalitySchema = new Schema<ILocality>({
  _id: { type: String, required: true },
  id: { type: Number, required: true },
  nom: { type: String, required: true },
  dep: { type: Number, required: true },
  cp: { type: String, required: true },
  ran: { type: Number, required: true },
});
