import { Routes } from '@angular/router';

export function loadHome() {
  return import('./home/home.module').then(m => m.HomeModule);
}

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
  },
  {
    path: 'not-found',
    loadChildren: './not-found/not-found.module#NotFoundModule',
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/not-found' },
];
