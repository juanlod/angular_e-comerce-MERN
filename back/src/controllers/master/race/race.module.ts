import { Module } from '@nestjs/common';
import { RaceService } from './race.service';
import { RaceController } from './race.controller';
import { DatabaseModule } from 'src/mongodb/database.module';
import { raceProviders } from 'src/mongodb/providers/master/race.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [RaceController],
  providers: [RaceService, ...raceProviders],
})
export class RaceModule {}
