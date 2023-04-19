import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CommonModule, registerLocaleData } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LoginComponent } from './components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { InicioComponent } from './components/inicio/inicio.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgZorroModule } from './ng-zorro.module';
import { MaterialModule } from './material.module';
import { ClienteModule } from './pages/clientes/cliente.module';

import es from '@angular/common/locales/es';
import en from '@angular/common/locales/en';
import gl from '@angular/common/locales/gl';

import { es_ES, NZ_I18N, gl_ES, en_GB } from 'ng-zorro-antd/i18n';
import { TranslationModule } from './translation.module';
import { PetModule } from './pages/pets/pet/pet.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(es);
registerLocaleData(en);
registerLocaleData(gl);


@NgModule({
  declarations: [AppComponent, LoginComponent, InicioComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    ToastrModule.forRoot(),
    NzFormModule,
    NzButtonModule,
    ReactiveFormsModule,
    NgZorroModule,
    MaterialModule,
    NgbModule,
    ClienteModule,
    TranslationModule,
    PetModule,
    FontAwesomeModule
  ],
  exports: [],
  providers: [{ provide: NZ_I18N, useValue: [es_ES, en_GB, gl_ES]}],
  bootstrap: [AppComponent],
})
export class AppModule {}
