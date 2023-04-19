import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { DatabaseModule } from 'src/mongodb/database.module';
import { clientProviders } from 'src/mongodb/providers/client.provider';
import { JwtModule } from '@nestjs/jwt';
import { PetService } from '../pets/pets.service';

@Module({
  imports: [DatabaseModule, JwtModule],
  controllers: [ClientsController],
  providers: [ClientsService, PetService, ...clientProviders],
})
export class ClientsModule {}
