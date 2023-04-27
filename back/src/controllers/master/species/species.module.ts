import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { DatabaseModule } from 'src/mongodb/database.module';
import { speciesProviders } from 'src/mongodb/providers/master/species.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [SpeciesController],
  providers: [SpeciesService, ...speciesProviders],
})
export class SpeciesModule {}
