import mongoose, { Connection } from 'mongoose';
import { SexSchema } from '../schemas/master/sex';

export const sexProviders = [
  {
    provide: 'SEX_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('sexes', SexSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
