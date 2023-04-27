import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from './guards/admin.guard';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { ClienteComponent } from './pages/clinic/clientes/cliente/cliente.component';
import { ClienteFormComponent } from './pages/clinic/clientes/cliente-form/cliente-form.component';
import { ClientDetailComponent } from './pages/clinic/clientes/client-detail/client-detail.component';
import { PetFormComponent } from './pages/clinic/pets/pet-form/pet-form.component';
import { PetDetailComponent } from './pages/clinic/pets/pet-detail/pet-detail.component';
import { ProductosComponent } from './pages/inventario/productos-component/productos/productos.component';
import { ProveedoresFormComponent } from './pages/inventario/proveedores-components/proveedores-form/proveedores-form.component';
import { ProveedoresComponent } from './pages/inventario/proveedores-components/proveedores/proveedores.component';
import { ProductosFormComponent } from './pages/inventario/productos-component/productos-form/productos-form.component';
import { ProductosDetailComponent } from './pages/inventario/productos-component/productos-detail/productos-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: InicioComponent,
    canActivate: [AdminGuard],
    data: {
      roles: ['admin'],
    },
    children: [
      {
        path: 'clients',
        children: [
          { path: '', component: ClienteComponent },
          { path: 'form', component: ClienteFormComponent },
          { path: 'form/:id', component: ClienteFormComponent },
          { path: 'detail/:id', component: ClientDetailComponent },
          {
            path: 'pets',
            children: [
              { path: 'form', component: PetFormComponent },
              { path: 'form/:id', component: PetFormComponent },
              { path: 'history/:id', component: PetDetailComponent },
            ],
          },
        ],
      },
      {
        path: 'inventory',
        children:[
          { path: 'products', component: ProductosComponent },
          { path: 'products/form', component: ProductosFormComponent },
          { path: 'products/form/:id', component: ProductosFormComponent },
          { path: 'products/detail/:id', component: ProductosDetailComponent },
          { path: 'providers', component: ProveedoresComponent },
          { path: 'providers/form', component: ProveedoresFormComponent },
          { path: 'providers/form/:id', component: ProveedoresFormComponent},
        ]
      }
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],

  exports: [RouterModule],
})
export class AppRoutingModule {}
