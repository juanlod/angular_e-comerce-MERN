import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { speciesProviders } from 'src/mongodb/providers/species.provider';
import { DatabaseModule } from 'src/mongodb/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SpeciesController],
  providers: [SpeciesService, ...speciesProviders],
})
export class SpeciesModule {}
