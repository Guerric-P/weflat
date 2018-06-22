import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { environment } from 'environments/environment';
import { LocalStorageService } from './local-storage.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthenticationService);
    const authHeader = this.localStorageService.token;
    let finalReq: HttpRequest<any> = req.clone({ url: environment.baseBackendUrl + req.url });

    if (req.url !== '/login') {
      if (authHeader) {
        finalReq = finalReq.clone({ headers: req.headers.set('Authorization', 'Bearer ' + authHeader) });
      }

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
      return next.handle(finalReq);
    }
  }

  constructor(private router: Router, private localStorageService: LocalStorageService, private injector: Injector) { }

}
