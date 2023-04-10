import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from './guards/admin.guard';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { ClienteComponent } from './pages/clientes/cliente/cliente.component';

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
        path: 'clientes',
        loadChildren: () =>
          import('./pages/clientes/cliente-routing.module').then(
            (m) => m.ClienteRoutingModule
          ),
      },{
        path: 'clientes/form',
        loadChildren: () =>
          import('./pages/clientes/cliente-routing.module').then(
            (m) => m.ClienteRoutingModule
          ),
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
