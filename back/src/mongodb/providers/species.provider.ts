import mongoose, { Connection } from 'mongoose';
import { SexSchema } from '../schemas/sex';

export const speciesProviders = [
  {
    provide: 'SPECIES_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('species', SexSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
