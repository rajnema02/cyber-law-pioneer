import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { AlertService } from './alert.service';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    public tokenService: TokenService,
    public router: Router,
    // private as: AlertService,
    private auth: AuthService
  ) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.tokenService.token = localStorage.getItem('token');
    if (this.tokenService.getToken()) {
      // console.log('get token initialised', this.tokenService.token);
      if (!this.tokenService.isTokenExpired()) {

        request = request.clone({
          setHeaders: {
            authorization: `Bearer ${this.tokenService.getToken()}`,
          },
        });

      } else {
        // this.as.warningToast('Session Expired! Please Login');
        this.auth.logout();
      }
    }
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
            return next.handle(request);
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              // this.as.errorToast(err.error.error.message);
              const msg = 'You are not authorized to performed this action';
              this.router.navigate([`/login`]);
            } else {
              console.log(err.error.error.message);

              alert(err.error.error.message);
            }
            // else {
            //   // this.as.errorToast(err.error.error.message);
            // }
          }
        },
        () => {

        }
      )
    );
  }
}
