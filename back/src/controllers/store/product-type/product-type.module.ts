import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/mongodb/database.module';
import { productTypeProviders } from 'src/mongodb/providers/store/product-type.provider';
import { ProductTypeService } from './product-type.service';
import { ProductTypeController } from './product-type.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductTypeController],
  providers: [ProductTypeService, ...productTypeProviders],
})
export class ProductTypeModule {}
