import { Module } from '@nestjs/common';
import { SexService } from './sex.service';
import { SexController } from './sex.controller';
import { DatabaseModule } from 'src/mongodb/database.module';
import { sexProviders } from 'src/mongodb/providers/master/sex.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [SexController],
  providers: [SexService, ...sexProviders],
})
export class SexModule {}
