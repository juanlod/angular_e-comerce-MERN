import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ProvinceController } from './province.controller';
import { DatabaseModule } from 'src/mongodb/database.module';
import { provinceProviders } from 'src/mongodb/providers/master/province.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ProvinceController],
  providers: [ProvinceService, ...provinceProviders],
})
export class ProvinceModule {}
