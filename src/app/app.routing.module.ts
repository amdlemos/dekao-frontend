import { CustomersListComponent } from './modules/customers/components/customers-list/customers-list.component';

import { LoginComponent } from './_components/login/login.component';
import { UserFormComponent } from './_components/user/user-form/user-form.component';
import { UserListComponent } from './_components/user/user-list/user-list.component'
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_services/auth-guard.service';
import { HomeComponent } from './_components/home/home.component';
import { CustomersFormComponent } from './modules/customers/components/customers-form/customers-form.component';


const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'users/new', component: UserFormComponent, canActivate: [AuthGuard] },    
  { path: 'users/edit/:id', component: UserFormComponent, canActivate: [AuthGuard] },    
  { path: 'customers', component: CustomersListComponent, canActivate: [AuthGuard] },
  { path: 'customers/new', component: CustomersFormComponent, canActivate: [AuthGuard] },    


];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
