'use strict';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Definición de la interfaz para el documento de product
export interface IProductType {
  id: number;
  name: string;
  active: boolean;
  deleted: boolean;
}

export const ProductTypeSchema = new Schema<IProductType>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  active: { type: Boolean, required: true },
  deleted: { type: Boolean, required: true },
});

export class ProductType {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  deleted: boolean;
}
