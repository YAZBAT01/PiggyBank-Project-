/*import { Routes } from '@angular/router';

export const routes: Routes = [];*/

import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MovimentiComponent } from './pages/movimenti/movimenti.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  

  {
    path: '',
    component: MainLayoutComponent,
    // canActivate: [authGuard],   // si aggiunge quando scriviamo la guard
    children: [
      { path: 'dashboard', component: DashboardComponent },
      // transactions, transfer, recharge, profile, change-password:
      // si aggiungono qui man mano che scriviamo le pagine
    ],
  },
    { 
    path: 'movimenti', 
    loadComponent: () => import('./pages/movimenti/movimenti.component').then(m => m.MovimentiComponent) 
  },
  // Rotta per la ricarica telefono
 {path: 'recharge', loadComponent:() => import('./pages/telefono/telefono.component').then(m => m.TelefonoComponent )
 },
  
  // Reindirizzamento opzionale se la rotta 'transactions' era una vecchia rotta
  { 
    path: 'transactions', 
    redirectTo: 'movimenti' 
  }
];



/*import { Routes } from '@angular/router';

export const routes: Routes = [];*/

import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


  {
    path: '',
    component: MainLayoutComponent,
    // canActivate: [authGuard],   // si aggiunge quando scriviamo la guard
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      // transactions, transfer, recharge, change-password:
      // si aggiungono qui man mano che scriviamo le pagine
    ],
  },
];


