import { AuthService } from 'src/app/_services/auth.service';
import { JwtModule } from "@auth0/angular-jwt";
// angular modules
import { ServiceWorkerModule } from '@angular/service-worker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// app modules
import { AppRoutingModule } from './app.routing.module';
import { environment } from '../environments/environment';

// my components
import { UserListComponent } from './_components/user/user-list/user-list.component';
import { UserFormComponent } from './_components/user/user-form/user-form.component';
import { AppComponent } from './app.component';

// my services
import { OfflineService } from './_services/offline.service';
import { UserService } from './_services/user.service';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from 'src/app/modules/material/material-module';


import { FabAddButtonComponent } from './_components/buttons/fab/fab-add-button/fab-add-button.component';
import { DekaoDatabase } from './dexie/dekaoDb';
import { LoginComponent } from './_components/login/login.component'
import { AuthGuard } from './_services/auth.guard';
import { HomeComponent } from './_components/home/home.component';
import { CustomersComponent } from './_components/customers/customers.component';



@NgModule({  
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule, 
    FlexLayoutModule,   
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),    
    HttpClientModule,
    LayoutModule,    
    FormsModule,
    ReactiveFormsModule,    
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return     localStorage.getItem('access_token');},
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['http://localhost:3000/auth/login']
      }
    })
  ],    
  declarations: [
    AppComponent,    
    UserListComponent,
    UserFormComponent,        
    HomeComponent,    
    FabAddButtonComponent, 
    LoginComponent, CustomersComponent,
   
  ],
  bootstrap: [
    AppComponent,    
  ],
  providers: [    
    UserService,
    OfflineService, 
    DekaoDatabase,
    AuthService,
    AuthGuard, 
  ],
 
})
export class AppModule { }
