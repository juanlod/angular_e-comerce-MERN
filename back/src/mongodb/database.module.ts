import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/database.provider';
import { userProviders } from './providers/user.provider';
import { clientProviders } from './providers/client.provider';
import { localityProviders } from './providers/locality.provider';
import { provinceProviders } from './providers/province.provider';
import { petProviders } from './providers/pet.provider';

@Module({
  imports: [],
  providers: [
    ...databaseProviders,
    ...userProviders,
    ...clientProviders,
    ...localityProviders,
    ...provinceProviders,
    ...petProviders,
  ],
  exports: [
    ...databaseProviders,
    ...userProviders,
    ...clientProviders,
    ...localityProviders,
    ...provinceProviders,
    ...petProviders,
  ],
})
export class DatabaseModule {}
