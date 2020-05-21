import { Login } from '../_models/login.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// jwt
import * as jwtDecode from 'jwt-decode';
import { JWTPayload } from 'src/app/_models/jwt-payload.model';
// other
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


const API = 'http://localhost:4040/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

  public isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    ) { }

  login(login: Login) {
    console.log('auth service: ', login);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    console.log
    return this.http.post<{ access_token: string }>(`${API}auth/login`, JSON.stringify(login), { headers: headers })
      .subscribe(res => {
        this.isAuthenticated.next(true);
        this.setSession(res);
        this.router.navigate(['/']);
      });
  }

  logout(redirect: string) {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');

    this.isAuthenticated.next(false);
      this.router.navigate([redirect]);
  }

  async isLoggedIn() {
    console.log('esta logado?')
    const authenticated = await moment().isBefore(this.getExpiration());
    await this.isAuthenticated.next(authenticated);
    console.log(authenticated)
    return await authenticated;
  }

  private setSession(authResult) {
    console.log('Set session:', authResult)
    const token = authResult.access_token;    
    const payload = <JWTPayload>jwtDecode(token);
    const expiresAt = moment.unix(payload.exp);
    console.log('expiresAt', expiresAt)

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }
}
