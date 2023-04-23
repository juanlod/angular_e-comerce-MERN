import { Module } from '@nestjs/common';
import { PetHistoryService } from './history.service';
import { PetHistoryController } from './history.controller';
import { historyProviders } from 'src/mongodb/providers/history.provider';
import { DatabaseModule } from 'src/mongodb/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PetHistoryController],
  providers: [PetHistoryService, ...historyProviders],
})
export class PetHistoryModule {}
