import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { environment } from 'environments/environment';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthenticationService);
    const finalReq: HttpRequest<any> = req.clone({ url: environment.baseBackendUrl + req.url });

    if (req.url !== '/login') {
      return next.handle(finalReq).pipe(
        catchError(
          err => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401 || err.status === 403) {

                // TODO add ping method to check if user is logged in
                /*authService.returnUrl = this.router.routerState.snapshot.url;
                this.router.navigate(['/']);*/
              }
              return throwError(err.message || 'Erreur du serveur');
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
