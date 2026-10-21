import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'customers' },
  {
    path: 'customers',
    loadComponent: () =>
      import('./pages/customer-list/customer-list').then((m) => m.CustomerList),
  },
  {
    path: 'customers/new',
    loadComponent: () =>
      import('./pages/customer-form/customer-form').then((m) => m.CustomerForm),
  },
  {
    path: 'customers/:id/edit',
    loadComponent: () =>
      import('./pages/customer-form/customer-form').then((m) => m.CustomerForm),
  },
  { path: '**', redirectTo: 'customers' },
];
