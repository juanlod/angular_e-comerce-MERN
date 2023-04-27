import mongoose, { Connection } from 'mongoose';
import { SexSchema } from 'src/mongodb/schemas/master/sex';

export const speciesProviders = [
  {
    provide: 'SPECIES_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('species', SexSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
