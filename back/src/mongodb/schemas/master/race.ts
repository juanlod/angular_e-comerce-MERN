'use strict';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// 0 - NULL
// 1 - MACHO
// 2 - HEMBRA
// 3 - MACHO CASTRADO
// 4 - HEMBRA CASTRADA

/**
 * Interfaz de sexo. Necesario para implementacion
 */
export interface IRace extends Document {
  _id: string;
  id: number;
  nom: string;
  esp: number;
  ori: string;
  des: string;
  ran: number;
}

export class Race {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  nom: string;

  @ApiProperty()
  esp: number;

  @ApiProperty()
  ori: string;

  @ApiProperty()
  des: string;

  @ApiProperty()
  ran: number;
}

// Creacion de clase sexo a traves de la interfaz
export const RaceSchema = new Schema<IRace>({
  _id: { type: String, required: true },
  id: { type: Number, required: true },
  nom: { type: String, required: true },
  esp: { type: Number, required: false },
  ori: { type: String, required: false },
  des: { type: String, required: false },
  ran: { type: Number, required: true },
});