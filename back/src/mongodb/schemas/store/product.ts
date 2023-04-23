'use strict';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Definición de la interfaz para el documento de product
interface IProduct extends Document {
  id: number;
  name: string;
  provider_id: number;
  type_product_id: number;
  active: number;
  unity_type_id: number;
  deleted: number;
  generic_drug: boolean;
  vacinne: boolean;
  deworming: boolean;
}

export class Product {
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
  providerId: number;

  @ApiProperty()
  typeProductId: number;

  @ApiProperty()
  unityTypeId: number;

  @ApiProperty()
  genericDrug: boolean;

  @ApiProperty()
  vaccine: boolean;

  @ApiProperty()
  deworming: boolean;
}

// Creacion de clase a traves de la interfaz
export const ProductSchema = new Schema<IProduct>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  provider_id: { type: Number, required: true },
  type_product_id: { type: Number, required: true },
  active: { type: Number, required: true },
  unity_type_id: { type: Number, required: true },
  deleted: { type: Number, required: true },
  generic_drug: { type: Boolean, required: true },
  vacinne: { type: Boolean, required: true },
  deworming: { type: Boolean, required: true },
});
