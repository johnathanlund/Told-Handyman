import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { ToldHandymanComponent }  from './told-handyman.component';
import { AdminHandymanComponent } from './admin-handyman.component';
import { LoginComponent }         from './login.component';

const routes: Routes = [
  { path: '', redirectTo: '/ToldHandyman', pathMatch: 'full' },
  { path: 'ToldHandyman', component: ToldHandymanComponent },
  { path: 'AdminHandyman', component: LoginComponent },
  { path: 'RealAdminHandyman', component: AdminHandymanComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
