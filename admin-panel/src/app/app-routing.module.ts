import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from './guards/admin.guard';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { ClienteComponent } from './pages/clientes/cliente/cliente.component';
import { ClienteFormComponent } from './pages/clientes/cliente-form/cliente-form.component';
import { ClientDetailComponent } from './pages/clientes/client-detail/client-detail.component';
import { PetHistoryComponent } from './pages/pets/pet-history/pet-history.component';
import { PetFormComponent } from './pages/pets/pet-form/pet-form.component';

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
              { path: 'history/:id', component: PetHistoryComponent },
            ],
          },
        ],
      },
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
