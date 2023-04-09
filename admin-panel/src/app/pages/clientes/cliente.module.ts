import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteRoutingModule } from './cliente-routing.module';



@NgModule({
  declarations: [
    ClienteComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule
  ],
  exports: [
    ClienteRoutingModule
  ]
})
export class ClienteModule { }
