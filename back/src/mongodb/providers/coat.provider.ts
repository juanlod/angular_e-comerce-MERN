import mongoose, { Connection } from 'mongoose';
import { CoatSchema } from '../schemas/coat';

export const coatProviders = [
  {
    provide: 'COAT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('pelaje', CoatSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
