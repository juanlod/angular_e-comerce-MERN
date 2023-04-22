import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgZorroModule } from 'src/app/ng-zorro.module';
import { MaterialModule } from 'src/app/material.module';
import { TranslationModule } from 'src/app/translation.module';
import { PetHistoryComponent } from './pet-history.component';
import { PetFormComponent } from '../pet-form/pet-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ClienteModule } from '../../clientes/cliente.module';

@NgModule({
  declarations: [PetHistoryComponent, PetFormComponent],
  imports: [
    CommonModule,
    NgZorroModule,
    MaterialModule,
    FormsModule,
    TranslationModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  exports: [PetFormComponent],
})
export class PetModule {}
