import { Module } from '@nestjs/common';
import { RaceService } from './race.service';
import { RaceController } from './race.controller';
import { raceProviders } from 'src/mongodb/providers/race.provider';
import { DatabaseModule } from 'src/mongodb/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RaceController],
  providers: [RaceService, ...raceProviders],
})
export class RaceModule {}
