import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/mongodb/database.module';
import { UnityTypeController } from './unity-type.controller';
import { unityTypeProviders } from 'src/mongodb/providers/store/unity-type.provider';
import { UnityTypeService } from './unity-type.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UnityTypeController],
  providers: [UnityTypeService, ...unityTypeProviders],
})
export class UnityTypeModule {}
