import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { ToldHandymanComponent }  from './told-handyman/told-handyman.component';
import { AdminHandymanComponent } from './admin-handyman/admin-handyman.component';
import { LoginComponent }         from './login/login.component';
import { RegisterComponent }      from './register/register.component';
import { AuthService }            from './_guards/auth.service';

const routes: Routes = [
  { path: '', redirectTo: '/ToldHandyman', pathMatch: 'full' },
  { path: 'ToldHandyman', component: ToldHandymanComponent },
  { path: 'AdminHandyman', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'login/AdminHandyman', component: AdminHandymanComponent, canActivate: [AuthService]  },
  // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'RealAdminHandyman', component: AdminHandymanComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
