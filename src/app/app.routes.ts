import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio.page').then((m) => m.InicioPage),
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contacto/contacto.page').then((m) => m.ContactoPage),
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
];
