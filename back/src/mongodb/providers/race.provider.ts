import mongoose, { Connection } from 'mongoose';
import { RaceSchema } from '../schemas/master/race';

export const raceProviders = [
  {
    provide: 'RACE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('races', RaceSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
