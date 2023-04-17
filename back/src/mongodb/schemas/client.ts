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
  @ApiProperty({name:'mongo id'})
  _id: string;

  @ApiProperty({name:'sql id'})
  idc: number;

  @ApiProperty({name:'full name'})
  ayn: string;
  
  @ApiProperty({name:'address'})
  dir: string;

  @ApiProperty({name:'postal code'})
  codp: string;

  @ApiProperty({name:'mongo id'})
  codt: string;

  @ApiProperty()
  tel: string;

  @ApiProperty()
  telC: string;

  @ApiProperty({name:'email'})
  email: string;

  @ApiProperty({name:'client observations'})
  obs: string;

  @ApiProperty()
  mark: number;

  @ApiProperty({name:'register date'})
  feci: Date;

  @ApiProperty()
  fecu: Date;

  @ApiProperty()
  motuv: string;

  @ApiProperty({name:'indicates if the client have debt'})
  deuda: boolean;

  @ApiProperty({name:'Indicates if the client is dangerous'})
  problematico: boolean;

  @ApiProperty({name:'debt quantity'})
  cantidadDeuda: string;

  @ApiProperty()
  obra: number;

  @ApiProperty({name:'locality id reference'})
  Loc: number;

  @ApiProperty({name:'province id reference'})
  Dep: number;

  @ApiProperty({name:'phone'})
  tel2: string;

  @ApiProperty({name:'movile phone'})
  telC2: string;

  @ApiProperty()
  codt2: string;

  @ApiProperty({name:'postal code'})
  codp2: string;

  @ApiProperty({name:'country identification number'})
  Identif: string;

  @ApiProperty({name:'list of pets'})
  mascotas: mongoose.Schema.Types.ObjectId[];
}

// Creacion de clase cliente a traves de la interfaz
export const ClientSchema = new Schema<IClient>({
  idc: { type: Number, required: true },
  ayn: { type: String, required: true },
  dir: { type: String, required: false },
  codp: { type: String, required: false },
  codt: { type: String, required: false },
  tel: { type: String, required: false },
  telC: { type: String, required: false },
  email: { type: String, required: false },
  obs: { type: String, required: false },
  mark: { type: Number, required: false },
  feci: { type: Date, required: false },
  fecu: { type: Date, required: false },
  motuv: { type: String, required: false },
  deuda: { type: Boolean, required: false },
  problematico: { type: Boolean, required: false },
  cantidadDeuda: { type: String, required: false },
  obra: { type: Number, required: false },
  Loc: { type: Number, required: false },
  Dep: { type: Number, required: false },
  tel2: { type: String, required: false },
  telC2: { type: String, required: false },
  codt2: { type: String, required: false },
  codp2: { type: String, required: false },
  Identif: { type: String, required: false },
  mascotas: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'mascotas', required: false },
  ],
});
