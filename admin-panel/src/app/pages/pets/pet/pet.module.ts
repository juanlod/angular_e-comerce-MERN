import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetComponent } from './pet.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgZorroModule } from 'src/app/ng-zorro.module';
import { MaterialModule } from 'src/app/material.module';
import { TranslationModule } from 'src/app/translation.module';



@NgModule({
  declarations: [PetComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgZorroModule,
    MaterialModule,
    TranslationModule
  ]
})
export class PetModule { }
