import mongoose, { Connection } from 'mongoose';
import { SexSchema } from '../schemas/sex';

export const sexProviders = [
  {
    provide: 'SEX_MODEL',
    useFactory: (connection: Connection) => connection.model('sexo', SexSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
