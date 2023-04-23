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
export interface ISex extends Document {
  _id: string;
  ids: number;
  value: string;
}

export class Sex {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  ids: number;

  @ApiProperty()
  value: string;
}

// Creacion de clase sexo a traves de la interfaz
export const SexSchema = new Schema<ISex>({
  _id: { type: String, required: true },
  ids: { type: Number, required: true },
  value: { type: String, required: true },
});
