import mongoose, { Connection } from 'mongoose';
import { StoreProviderSchema } from 'src/mongodb/schemas/store/store-provider';

export const storeProviderProviders = [
  {
    provide: 'STORE_PROVIDER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('providers', StoreProviderSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
