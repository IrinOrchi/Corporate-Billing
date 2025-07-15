import { Routes } from '@angular/router';
import { EditAccountPageComponent } from './pages/edit-account-page/edit-account-page.component';
import { SuccessfulAccountComponent } from './pages/successful-account/successful-account.component';
import { AuthGuard } from './guards/auth.guard';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { SettingsLayoutComponent } from './pages/shared-page/settings-layout/settings-layout.component';
import { NidPageComponent } from './pages/nid-page/nid-page.component';
import { UserMComponent } from './pages/user-m/user-m.component';
import { CreateAccountPageComponent } from './pages/create-account-page/create-account-page.component';
import { authGuardCreateAcc } from './guards/authGuardCreateAcc.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  // {
  //   path: 'edit',
  //   component: EditAccountPageComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'account-updated-successfully',
    component: SuccessfulAccountComponent,
    // canActivate: [AuthGuard]
  },
   {
        path:'register',
        component: CreateAccountPageComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: "account-created-successfully",
        component: SuccessfulAccountComponent,
        canActivate: [authGuardCreateAcc]
    },
  {
    path: 'settings',
    component: SettingsLayoutComponent,
    children: [
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'edit',
        component: EditAccountPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'nid',
        component: NidPageComponent,
      },
      {
        path: 'user-management',
        component: UserMComponent,
      },
    ],
  },
];
