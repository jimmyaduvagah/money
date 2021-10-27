import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthToken } from './authToken';
import { AuthService } from '../auth/auth.service';
import { Token } from '../base-model/model';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, public http: HttpClient) {

     }

        intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            // add auth header with jwt if user is logged in and request is to the api url
            const user = this.authService.userValue;
            console.log(user);
            if(user){
                const authReq = request.clone({
                    headers: request.headers.set('Authorization', `Bearer ${user.access}`)
                  });
                  // send cloned request with header to the next handler.
                return next.handle(authReq);
            }
           
            return next.handle(request);
        }
}


