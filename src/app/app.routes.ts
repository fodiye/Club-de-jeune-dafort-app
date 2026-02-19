import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing/landing.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
