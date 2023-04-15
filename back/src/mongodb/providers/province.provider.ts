import mongoose, { Connection } from 'mongoose';
import { ProvinceSchema } from '../schemas/province';

export const provinceProviders = [
  {
    provide: 'PROVINCE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('provincias', ProvinceSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
