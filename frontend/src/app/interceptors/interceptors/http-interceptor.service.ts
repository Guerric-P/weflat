import { Injectable, Injector, Optional, Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { AuthenticationService } from 'app/core/services/authentication.service';

@Injectable()
export class WeflatInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private injector: Injector,
    @Optional() @Inject(REQUEST) private request: Request
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthenticationService);
    const url = `${this.request ? environment.backendUrl : ''}${environment.baseBackendUrl}${req.url}`

    let headers = req.headers;

    if (this.request) {
      // Server side: forward the cookies
      const cookies = this.request.cookies;
      const cookiesArray = [];
      for (const name in cookies) {
        if (cookies.hasOwnProperty(name)) {
          cookiesArray.push(`${name}=${cookies[name]}`);
        }
      }
      headers = headers.append('Cookie', cookiesArray.join('; '));
    }

    headers = headers.append('Content-Type', 'application/json');

    const finalReq: HttpRequest<any> = req.clone({ url, headers });

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
