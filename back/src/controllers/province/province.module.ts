import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ProvinceController } from './province.controller';
import { provinceProviders } from 'src/mongodb/providers/province.provider';
import { DatabaseModule } from 'src/mongodb/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProvinceController],
  providers: [ProvinceService, ...provinceProviders],
})
export class ProvinceModule {}
