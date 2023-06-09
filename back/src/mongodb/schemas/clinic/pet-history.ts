/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Interfaz de cliente. Necesario para implementacion
 */
export interface IPetHistory extends Document {
  _id: string;
  idClinica: number;
  idm: number;
  fec: Date;
  cli: string;
  tmp: number;
  pes: number;
  idu: number;
  CantFotos: number;
}

export class PetHistory {
  @ApiProperty({ description: 'mongo id' })
  _id: string;

  @ApiProperty({ description: 'sql id' })
  idClinica: number;

  @ApiProperty({ description: 'pet id' })
  idm: number;

  @ApiProperty({ description: 'creation date' })
  fec: Date;

  @ApiProperty({ description: 'desease information' })
  cli: string;

  @ApiProperty({ description: 'temperature' })
  tmp: number;

  @ApiProperty({ description: 'weight' })
  pes: number;

  @ApiProperty({ description: '' })
  idu: number;

  @ApiProperty({ description: 'photography size' })
  cantFotos: number;
}

// Creacion de clase cliente a traves de la interfaz
export const PetHistorySchema = new Schema<IPetHistory>({
  idClinica: {
    type: Number,
    required: true,
  },
  idm: {
    type: Number,
    required: true,
  },
  fec: {
    type: Date,
    required: false,
  },
  cli: {
    type: String,
    required: false,
  },
  tmp: {
    type: Number,
    required: false,
  },
  pes: {
    type: Number,
    required: false,
  },
  idu: {
    type: Number,
    required: false,
  },
  CantFotos: {
    type: Number,
    required: false,
  },
});
