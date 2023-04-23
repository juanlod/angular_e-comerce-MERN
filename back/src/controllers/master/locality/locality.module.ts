import { Module } from '@nestjs/common';
import { LocalityService } from './locality.service';
import { LocalityController } from './locality.controller';
import { localityProviders } from 'src/mongodb/providers/locality.provider';
import { DatabaseModule } from 'src/mongodb/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LocalityController],
  providers: [LocalityService, ...localityProviders],
})
export class LocalityModule {}
