import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import { tap } from 'rxjs/operators/tap';
import { catchError } from 'rxjs/operators/catchError';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Router } from '@angular/router';
import { LocalStorageService } from 'app/services/local-storage.service';
import { AuthenticationService } from 'app/services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const authService = this.injector.get(AuthenticationService);
    const authHeader = this.localStorageService.token;
    let authReq: HttpRequest<any> = null;

    if (req.url !== '/backend/login') {
      if (authHeader) {
        authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + authHeader) });
      }
      else {
        authReq = req;
      }

      return next.handle(authReq).pipe(
        catchError(
          err => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401 || err.status === 403) {
                authService.returnUrl = this.router.routerState.snapshot.url;
                this.router.navigate(['/']);
              }
              return ErrorObservable.create(err.message || 'Erreur du serveur');
            }
          }
        )
      );
    }
    else{
      return next.handle(req);
    }
  }

  constructor(private router: Router, private localStorageService: LocalStorageService, private injector: Injector) { }

}
