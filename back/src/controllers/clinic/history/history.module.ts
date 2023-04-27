import { Module } from '@nestjs/common';
import { PetHistoryService } from './history.service';
import { PetHistoryController } from './history.controller';
import { DatabaseModule } from 'src/mongodb/database.module';
import { historyProviders } from 'src/mongodb/providers/clinic/history.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [PetHistoryController],
  providers: [PetHistoryService, ...historyProviders],
})
export class PetHistoryModule {}
