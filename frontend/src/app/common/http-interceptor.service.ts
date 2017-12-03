import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import { tap } from 'rxjs/operators/tap';
import { catchError } from 'rxjs/operators/catchError';
import { Router } from '@angular/router';
import { LocalStorageService } from 'app/services/local-storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const authHeader = this.localStorageService.token;
    let authReq: HttpRequest<any> = null;

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
              let url = this.router.routerState.snapshot.url;
              this.router.navigate(['/login'], { queryParams: { returnUrl: url } });
            }
            return Observable.throw(err.message || 'Erreur du serveur');
          }
        }
      )
    );
  }

  constructor(private router: Router, private localStorageService: LocalStorageService) { }

}
