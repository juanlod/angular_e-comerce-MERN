'use strict';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IDebt extends Document {
  _id: string;
  id: number;
  clientId: number;
  ticketNumber: string;
  deleted: boolean;
  paid: boolean;
  quantity: number;
  debtDate: string;
  paidDate: string;
}

export class Debt {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  clientId: number;

  @ApiProperty()
  ticketNumber: string;

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  paid: boolean;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  debtDate: string;

  @ApiProperty()
  paidDate: string;
}

// Creacion de clase sexo a traves de la interfaz
export const DebtSchema = new Schema<IDebt>({
  id: { type: Number, required: true },
  clientId: { type: Number, required: true },
  ticketNumber: { type: String, required: true },
  quantity: { type: Number, required: true },
  debtDate: {
    type: String,
    required: false,
    default: `${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDay()}`,
  },
  paidDate: {
    type: String,
    required: false,
    default: null,
  },
  deleted: { type: Boolean, required: false, default: false },
  paid: { type: Boolean, required: false, default: false },
});
