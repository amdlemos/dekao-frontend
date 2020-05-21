// angular
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  async canActivate() {    
    if (! await this.authService.isLoggedIn()) {
      console.log('User is not logged, redirecting to login.')
      await this.router.navigate(['login']);
      return false;     
    } else {     

      return true;
    }
  }
}