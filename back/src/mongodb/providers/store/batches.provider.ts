import mongoose, { Connection } from 'mongoose';
import { BatchSchema } from 'src/mongodb/schemas/store/batches';

export const batchesProviders = [
  {
    provide: 'BATCH_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('batches', BatchSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
