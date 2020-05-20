import { JwtModule } from '@nestjs/jwt';
// angular modules
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// app modules
import { AppRoutingModule } from './app-routing.module';
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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { FabAddButtonComponent } from './_components/buttons/fab/fab-add-button/fab-add-button.component';
import { DekaoDatabase } from './dexie/dekaoDb';
import { Dexie } from 'dexie'



@NgModule({  
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,    
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),    
    HttpClientModule,
    LayoutModule,    
    FormsModule,
    ReactiveFormsModule,
    // MatToolbarModule,
    // MatButtonModule,
    // MatSidenavModule,
    // MatIconModule,
    // MatListModule,
    // MatInputModule,
    // MatSelectModule,
    // MatRadioModule,
    // MatCardModule    
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
    FabAddButtonComponent    
   
  ],
  bootstrap: [
    AppComponent,    
  ],
  providers: [    
    UserService,
    OfflineService, 
    DekaoDatabase   
  ],
 
})
export class AppModule { }
