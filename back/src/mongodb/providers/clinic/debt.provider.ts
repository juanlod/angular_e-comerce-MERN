import mongoose, { Connection } from 'mongoose';
import { DebtSchema } from 'src/mongodb/schemas/clinic/debts';

export const debtProviders = [
  {
    provide: 'DEBT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('client_debts', DebtSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
