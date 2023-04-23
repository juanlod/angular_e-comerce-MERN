import { Module } from '@nestjs/common';
import { SexService } from './sex.service';
import { SexController } from './sex.controller';
import { sexProviders } from 'src/mongodb/providers/sex.provider';
import { DatabaseModule } from 'src/mongodb/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SexController],
  providers: [SexService, ...sexProviders],
})
export class SexModule {}
