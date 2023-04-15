import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/database.provider';
import { userProviders } from './providers/user.provider';
import { clientProviders } from './providers/client.provider';
import { localityProviders } from './providers/locality.provider';
import { provinceProviders } from './providers/province.provider';

@Module({
  imports: [],
  providers: [
    ...databaseProviders,
    ...userProviders,
    ...clientProviders,
    ...localityProviders,
    ...provinceProviders,
  ],
  exports: [
    ...databaseProviders,
    ...userProviders,
    ...clientProviders,
    ...localityProviders,
    ...provinceProviders,
  ],
})
export class DatabaseModule {}
