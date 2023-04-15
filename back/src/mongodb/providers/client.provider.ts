import mongoose, { Connection } from 'mongoose';
import { ClientSchema } from '../schemas/client';

export const clientProviders = [
  {
    provide: 'CLIENT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('clientes', ClientSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
