import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './mongodb/database.module';
import { UserModule } from './controllers/user/user.module';
import { ClientsModule } from './controllers/clients/clients.module';
import { LocalityModule } from './controllers/locality/locality.module';
import { ProvinceModule } from './controllers/province/province.module';
import { JwtModule } from '@nestjs/jwt';
import { environment } from './environments/environment';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ClientsModule,
    LocalityModule,
    ProvinceModule,
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
