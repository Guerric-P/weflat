import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { REQUEST } from '@weflat/express.tokens';
import { AuthenticationService } from '@weflat/app/core/services/authentication.service';
import { environment } from '@weflat/environments/environment';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export const weflatInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const request = inject(REQUEST, { optional: true });
  const router = inject(Router);

  const url = (request ? environment.backendUrl : environment.baseBackendUrl) + req.url;

  let headers = req.headers;

  if (request) {
    // Server side: forward the cookies
    const cookies = request.headers.cookie;

    if (cookies) {
      headers = headers.append('Cookie', cookies);
    }
  }

  headers = headers.append('Content-Type', 'application/json');

  const finalReq: HttpRequest<any> = req.clone({ url, headers });

  if (req.url !== '/login') {
    return next(finalReq).pipe(
      catchError(
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401 || err.status === 403) {
              authService.loadTokenFromCookie();
              if (!authService.isLoggedIn) {
                router.navigate(['/']);
              }
              // TODO add ping method to check if user is logged in
            }
            return throwError(err);
          }
        }
      )
    );
  } else {
    return next(finalReq).pipe(
      tap(() => authService.loadTokenFromCookie())
    );
  }
}

