import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { AuthenticationService } from '@weflat/app/core/services/authentication.service';
import { environment } from '@weflat/environments/environment';
import { Request } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class WeflatInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private injector: Injector,
    @Optional() @Inject(REQUEST) private request: Request
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthenticationService);
	const url = (this.request ? environment.backendUrl : environment.baseBackendUrl) + req.url;

    let headers = req.headers;

    if (this.request) {
      // Server side: forward the cookies
      const cookies = this.request.cookies;
      const cookiesArray = Object.entries(cookies).map(([key, val]) => `${key}=${val}`);
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
