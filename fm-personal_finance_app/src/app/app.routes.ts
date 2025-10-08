import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview'
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./pages/overview/overview.component').then((m) => m.OverviewComponent)
      },
      {
        path: 'transactions',
        loadComponent: () =>
          import('./pages/transactions/transactions.component').then((m) => m.TransactionsComponent)
      },
      {
        path: 'budgets',
        loadComponent: () =>
          import('./pages/budgets/budgets.component').then((m) => m.BudgetsComponent)
      },
      {
        path: 'pots',
        loadComponent: () =>
          import('./pages/pots/pots.component').then((m) => m.PotsComponent)
      },
      {
        path: 'recurring-bills',
        loadComponent: () =>
          import('./pages/recurring-bills/recurring-bills.component').then(
            (m) => m.RecurringBillsComponent
          )
      }
    ]
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./pages/auth/auth.component').then((m) => m.AuthComponent),
    data: {
      mode: 'login'
    }
  },
  {
    path: 'signup',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./pages/auth/auth.component').then((m) => m.AuthComponent),
    data: {
      mode: 'signup'
    }
  },
  {
    path: '**',
    redirectTo: 'overview'
  }
];
