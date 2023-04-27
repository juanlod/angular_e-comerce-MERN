import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/mongodb/database.module';

import { StoreProviderService } from './store-provider.service';
import { storeProviderProviders } from 'src/mongodb/providers/store/store-provider.provider';
import { StoreProviderController } from './store-provider.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [StoreProviderController],
  providers: [StoreProviderService, ...storeProviderProviders],
})
export class StoreProviderModule {}
