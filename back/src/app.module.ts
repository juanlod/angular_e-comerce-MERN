import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './mongodb/database.module';
import { UserModule } from './controllers/user/user.module';
import { ClientsModule } from './controllers/clinic/clients/clients.module';
import { LocalityModule } from './controllers/master/locality/locality.module';
import { ProvinceModule } from './controllers/master/province/province.module';
import { JwtModule } from '@nestjs/jwt';
import { environment } from './environments/environment';
import { PetsModule } from './controllers/clinic/pets/pets.module';
import { SexModule } from './controllers/master/sex/sex.module';
import { RaceModule } from './controllers/master/race/race.module';
import { CoatModule } from './controllers/master/coat/coat.module';
import { SpeciesModule } from './controllers/master/species/species.module';
import { PetHistoryModule } from './controllers/clinic/history/history.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ClientsModule,
    LocalityModule,
    ProvinceModule,
    PetsModule,
    SexModule,
    RaceModule,
    CoatModule,
    SpeciesModule,
    PetHistoryModule,
    JwtModule.register({
      secret: environment.secret, // reemplaza esto con tu propia clave secreta
      signOptions: { expiresIn: '7d' }, // cambia según tus necesidades
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule],
})
export class AppModule {}
