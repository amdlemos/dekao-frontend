// angular
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// others
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("auth interceptor");
        const token = localStorage.getItem('token');
        
        if (token) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', 'Bearer '.concat(token))
            });

            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}