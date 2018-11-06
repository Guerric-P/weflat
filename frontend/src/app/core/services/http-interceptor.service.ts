import { Injectable, Injector, Optional, Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { environment } from 'environments/environment';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private injector: Injector,
    @Optional() @Inject('REQUEST') private request: any
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthenticationService);
    const update: any  = { url: `${this.request ? this.request.protocol + '://' + this.request.get('host') : ''}${environment.baseBackendUrl}${req.url}` };

    if (this.request) {
      // Server side: forward the cookies
      const rawCookies = !!this.request.headers['cookie'] ? this.request.headers['cookie'] : '';
      update.setHeaders = { 'cookie': rawCookies };
    }

    const finalReq: HttpRequest<any> = req.clone(update);

    if (req.url !== '/login') {
      return next.handle(finalReq).pipe(
        catchError(
          err => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401 || err.status === 403) {
                authService.loadTokenFromCookie();
                if (!authService.isLoggedIn) {
                  this.router.navigate(['/']);
                }
                // TODO add ping method to check if user is logged in
              }
              return throwError(err);
            }
          }
        )
      );
    } else {
      return next.handle(finalReq).pipe(
        tap(() => authService.loadTokenFromCookie())
      );
    }
  }
}
