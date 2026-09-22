import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccessLogsComponent } from './pages/access-log/access-log.component';
import { TransferComponent } from './pages/transfer/transfer.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: '',
    component: MainLayoutComponent,
    // canActivate: [authGuard],

    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },

      {
        path: 'access-log',
        component: AccessLogsComponent
      },

      {
        path: 'transfer',
        component: TransferComponent
      }

      // Qui potrai aggiungere in seguito:
      // {
      //   path: 'transactions',
      //   component: TransactionsComponent
      // },
      //
      // {
      //   path: 'mobile-recharge',
      //   component: MobileRechargeComponent
      // },
      //
      // {
      //   path: 'bank-transfer',
      //   component: BankTransferComponent
      // },
      //
      // {
      //   path: 'profile',
      //   component: ProfileComponent
      // },
      //
      // {
      //   path: 'change-password',
      //   component: ChangePasswordComponent
      // }
    ]
  }
];