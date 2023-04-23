'use strict';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Interfaz. Necesario para implementacion
 */
export interface IProvider extends Document {
  id: number;
  address: string;
  name: string;
  active: number;
  deleted: number;
  phoneNumber: string;
}

export class Provider {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  phoneNumber: string;
}

// Creacion de clase a traves de la interfaz
export const ProviderSchema = new Schema<IProvider>({
  id: { type: Number, required: true },
  address: { type: String, required: false },
  name: { type: String, required: false },
  active: { type: Number, required: false },
  deleted: { type: Number, required: false },
  phoneNumber: { type: String, required: false },
});
