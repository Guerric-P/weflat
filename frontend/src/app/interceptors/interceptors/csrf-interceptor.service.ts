import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(err => {
                if (err instanceof HttpErrorResponse && err.status === 403) {
                    // Assert the error is due to XSRF cookie missing which should have been set in the response, so just retry the request
                    return next.handle(req);
                }
                return throwError(err);
            })
        );
    }
}
