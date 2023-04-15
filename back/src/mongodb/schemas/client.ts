/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Interfaz de cliente. Necesario para implementacion
 */
export interface IClient extends Document {
  _id: string;
  idc: number;
  ayn: string;
  dir: string;
  codp: string;
  codt: string;
  tel: string;
  telC: string;
  email: string;
  obs: string;
  mark: number;
  feci: Date;
  fecu: Date;
  motuv: string;
  deuda: boolean;
  problematico: boolean;
  cantidadDeuda: string;
  obra: number;
  Loc: number;
  Dep: number;
  tel2: string;
  telC2: string;
  codt2: string;
  codp2: string;
  Identif: string;
  mascotas: mongoose.Schema.Types.ObjectId[];
}

export class Client {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  idc: number;
  @ApiProperty()
  ayn: string;
  @ApiProperty()
  dir: string;
  @ApiProperty()
  codp: string;
  @ApiProperty()
  codt: string;
  @ApiProperty()
  tel: string;
  @ApiProperty()
  telC: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  obs: string;
  @ApiProperty()
  mark: number;
  @ApiProperty()
  feci: Date;
  @ApiProperty()
  fecu: Date;
  @ApiProperty()
  motuv: string;
  @ApiProperty()
  deuda: boolean;
  @ApiProperty()
  problematico: boolean;
  @ApiProperty()
  cantidadDeuda: string;
  @ApiProperty()
  obra: number;
  @ApiProperty()
  Loc: number;
  @ApiProperty()
  Dep: number;
  @ApiProperty()
  tel2: string;
  @ApiProperty()
  telC2: string;
  @ApiProperty()
  codt2: string;
  @ApiProperty()
  codp2: string;
  @ApiProperty()
  Identif: string;
  @ApiProperty()
  mascotas: mongoose.Schema.Types.ObjectId[];
}

// Creacion de clase cliente a traves de la interfaz
export const ClientSchema = new Schema<IClient>({
  _id: { type: String, required: true },
  idc: { type: Number, required: true },
  ayn: { type: String, required: true },
  dir: { type: String, required: true },
  codp: { type: String, required: false },
  codt: { type: String, required: false },
  tel: { type: String, required: false },
  telC: { type: String, required: false },
  email: { type: String, required: false },
  obs: { type: String, required: false },
  mark: { type: Number, required: true },
  feci: { type: Date, required: true },
  fecu: { type: Date, required: true },
  motuv: { type: String, required: false },
  deuda: { type: Boolean, required: false },
  problematico: { type: Boolean, required: false },
  cantidadDeuda: { type: String, required: false },
  obra: { type: Number, required: true },
  Loc: { type: Number, required: true },
  Dep: { type: Number, required: true },
  tel2: { type: String, required: false },
  telC2: { type: String, required: true },
  codt2: { type: String, required: false },
  codp2: { type: String, required: false },
  Identif: { type: String, required: true },
  mascotas: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'mascotas', required: false },
  ],
});
