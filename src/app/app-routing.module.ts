import { UserFormComponent } from './_components/user/user-form/user-form.component';
import { UserListComponent } from './_components/user/user-list/user-list.component'
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const APP_ROUTES: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/new', component: UserFormComponent },
  // { path: ':id/edit', component: UserFormComponent },
  // { path: ':id', component: UserFormComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
