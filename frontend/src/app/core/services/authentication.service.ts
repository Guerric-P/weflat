import { Injectable, PLATFORM_ID, Inject, Optional } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject, throwError, of } from 'rxjs';
import { map, catchError, timeout, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Request, Response } from 'express';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';

@Injectable()
export class AuthenticationService {

    private userLoggedInSubject: Subject<any> = new Subject<any>();
    private userLoggedOutSubject: Subject<any> = new Subject<any>();
    private _tokenPayload: any;
    private isBrowser: boolean;

    public returnUrl: string;

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) platformId: string,
        @Optional() @Inject(REQUEST) private request: Request,
        @Optional() @Inject(RESPONSE) private response: Response
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
        this.loadTokenFromCookie();
    }

    login(username: string, password: string) {
        return this.http.post('/login', JSON.stringify({ username: username, password: password }), { observe: 'response' }).pipe(
            map((response: HttpResponse<any>) => {
                // login successful if there's a jwt token in the response
                this.userLoggedInSubject.next(null);
                return;
            }),
            catchError(x => {
                return throwError(x);
            })
        );
    }

    logout() {
        // remove user from local storage to log user out
        return this.http.post('/logout', null).pipe(
            timeout(1000),
            catchError(() => of(undefined)),
            tap(() => {
                this.reset();
                this.userLoggedOutSubject.next(null);
            })
        );
    }

    loadTokenFromCookie() {
        const token = this.getCookie('weflat_token');

        if (token) {
            const tokenPayload = jwt_decode(token);
            this._tokenPayload = tokenPayload;
        } else {
            this.reset();
        }
    }

    reset() {
        this.resetCookie('weflat_token');
        this._tokenPayload = null;
    }

    get isLoggedIn(): boolean {
        return !!this._tokenPayload;
    }

    get isAdmin(): boolean {
        return this._tokenPayload && this._tokenPayload.roles.map(x => x.authority).includes('admin');
    }

    get isArchitect(): boolean {
        return this._tokenPayload && this._tokenPayload.roles.map(x => x.authority).includes('architect');
    }

    get isCustomer(): boolean {
        return this._tokenPayload && this._tokenPayload.roles.map(x => x.authority).includes('customer');
    }

    get userLoggedIn(): Observable<any> {
        return this.userLoggedInSubject.asObservable();
    }

    get userLoggedOut(): Observable<any> {
        return this.userLoggedOutSubject.asObservable();
    }

    get userId(): number {
        return this._tokenPayload && this._tokenPayload.id;
    }

    get userEmail(): string {
        return this._tokenPayload && this._tokenPayload.sub;
    }

    get displayName(): string {
        return this._tokenPayload && this._tokenPayload.displayName;
    }

    get tokenPayload(): any {
        return this._tokenPayload;
    }

    getCookie(name) {
        let value;
        if (this.isBrowser) {
            value = '; ' + document.cookie;
            const parts = value.split('; ' + name + '=');
            if (parts.length === 2) {
                return parts.pop().split(';').shift();
            }
        } else {
            const cookie = this.request.cookies[name];
            return cookie;
        }
    }

    resetCookie(name) {
        if (this.isBrowser) {
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        } else {
            this.response.clearCookie(name);
        }
    };
}
