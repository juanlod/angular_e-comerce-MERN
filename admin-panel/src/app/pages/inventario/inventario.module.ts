import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos-component/productos/productos.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProveedoresComponent } from './proveedores-components/proveedores/proveedores.component';
import { ProveedoresFormComponent } from './proveedores-components/proveedores-form/proveedores-form.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoteComponent } from './productos-component/lote/lote.component';
import { ProductosFormComponent } from './productos-component/productos-form/productos-form.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from 'src/app/material.module';
import { NgZorroModule } from 'src/app/ng-zorro.module';
import { TranslationModule } from 'src/app/translation.module';
import { ToastrModule } from 'ngx-toastr';
import { ProductosDetailComponent } from './productos-component/productos-detail/productos-detail.component';

@NgModule({
  declarations: [
    ProductosComponent,
    ProveedoresComponent,
    ProveedoresFormComponent,
    ProductosDetailComponent,
    ProductosFormComponent,
    LoteComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    NgZorroModule,
    MaterialModule,
    FormsModule,
    TranslationModule,
    AppRoutingModule,
    FontAwesomeModule,
    ToastrModule

  ],
  providers: []
})
export class InventarioModule {}
