import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/mongodb/database.module';
import { batchesProviders } from 'src/mongodb/providers/store/batches.provider';
import { BatchController } from './batches.controller';
import { BatchService } from './batches.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BatchController],
  providers: [BatchService, ...batchesProviders],
})
export class BatchModule {}
