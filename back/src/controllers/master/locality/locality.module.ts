import { Module } from '@nestjs/common';
import { LocalityService } from './locality.service';
import { LocalityController } from './locality.controller';
import { DatabaseModule } from 'src/mongodb/database.module';
import { localityProviders } from 'src/mongodb/providers/master/locality.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [LocalityController],
  providers: [LocalityService, ...localityProviders],
})
export class LocalityModule {}
