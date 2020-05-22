import { MaterialModule } from './../material/material-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { CustomersFormComponent } from './components/customers-form/customers-form.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [CustomersListComponent, CustomersFormComponent],
  imports: [
    CommonModule, 
    MaterialModule,
  ],
 
})
export class CustomersModule { }
