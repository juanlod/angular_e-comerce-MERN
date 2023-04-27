import { Module } from '@nestjs/common';
import { CoatService } from './coat.service';
import { CoatController } from './coat.controller';
import { coatProviders } from 'src/mongodb/providers/master/coat.provider';
import { DatabaseModule } from 'src/mongodb/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CoatController],
  providers: [CoatService, ...coatProviders],
})
export class CoatModule {}
