import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const csrfInterceptor: HttpInterceptorFn = (req, next) => next(req).pipe(
    catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 403) {
            // Assert the error is due to XSRF cookie missing which should have been set in the response, so just retry the request
            return next(req);
        }
        return throwError(err);
    })
);