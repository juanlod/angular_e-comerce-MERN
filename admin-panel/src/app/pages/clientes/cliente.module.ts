import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './cliente/cliente.component';
import { NgZorroModule } from '../../../app/ng-zorro.module';
import { MaterialModule } from '../../../app/material.module';
import { FormsModule } from '@angular/forms';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { TranslationModule } from 'src/app/translation.module';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    ClienteComponent,
    ClienteFormComponent,
    ClientDetailComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    MaterialModule,
    FormsModule,
    TranslationModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  exports: [
  ]
})
export class ClienteModule { }
