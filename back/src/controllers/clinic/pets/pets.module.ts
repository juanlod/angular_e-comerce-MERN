import { Module } from '@nestjs/common';
import { PetService } from './pets.service';
import { PetsController } from './pets.controller';
import { DatabaseModule } from 'src/mongodb/database.module';
import { JwtModule } from '@nestjs/jwt';
import { petProviders } from 'src/mongodb/providers/clinic/pet.provider';

@Module({
  imports: [DatabaseModule, JwtModule],
  controllers: [PetsController],
  providers: [PetService, ...petProviders],
})
export class PetsModule {}
