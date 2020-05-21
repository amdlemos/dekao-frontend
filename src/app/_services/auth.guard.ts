// angular
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  async canActivate() {
    console.log("authguard", this.authService.isLoggedIn())
    if (! await this.authService.isLoggedIn()) {
      await this.router.navigate(['login']);
      return false;
     
    } else {     

      return true;
    }
  }
}