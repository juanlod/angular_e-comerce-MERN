import mongoose, { Connection } from 'mongoose';
import { RaceSchema } from '../schemas/race';

export const raceProviders = [
  {
    provide: 'RACE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('raza', RaceSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
