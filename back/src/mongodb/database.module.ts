import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/database.provider';
import { userProviders } from './providers/user.provider';
import { clientProviders } from './providers/client.provider';
import { localityProviders } from './providers/locality.provider';
import { provinceProviders } from './providers/province.provider';
import { petProviders } from './providers/pet.provider';
import { sexProviders } from './providers/sex.provider';
import { raceProviders } from './providers/race.provider';
import { speciesProviders } from './providers/species.provider';
import { coatProviders } from './providers/coat.provider';

@Module({
  imports: [],
  providers: [
    ...databaseProviders,
    ...userProviders,
    ...clientProviders,
    ...localityProviders,
    ...provinceProviders,
    ...petProviders,
    ...sexProviders,
    ...raceProviders,
    ...speciesProviders,
    ...coatProviders,
  ],
  exports: [
    ...databaseProviders,
    ...userProviders,
    ...clientProviders,
    ...localityProviders,
    ...provinceProviders,
    ...petProviders,
    ...sexProviders,
    ...raceProviders,
    ...speciesProviders,
    ...coatProviders,
  ],
})
export class DatabaseModule {}
