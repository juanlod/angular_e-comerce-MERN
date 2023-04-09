import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteRoutingModule } from './cliente-routing.module';
import { NgZorroModule } from '../../../app/ng-zorro.module';
import { MaterialModule } from '../../../app/material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ClienteComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    NgZorroModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    ClienteRoutingModule
  ]
})
export class ClienteModule { }
