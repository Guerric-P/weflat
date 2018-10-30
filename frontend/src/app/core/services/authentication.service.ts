import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject, throwError, of } from 'rxjs';
import { map, catchError, timeout, tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthenticationService {

    private userLoggedInSubject: Subject<any> = new Subject<any>();
    private userLoggedOutSubject: Subject<any> = new Subject<any>();
    private _isLoggedIn = false;
    private _isArchitect = false;
    private _isAdmin = false;
    private _isCustomer = false;
    private _userId: number;
    private _userEmail: string;
    private _displayName: string;
    private _tokenPayload: any;

    public returnUrl: string;

    constructor(private http: HttpClient) {
        this.loadTokenFromCookie();
    }

    login(username: string, password: string) {
        return this.http.post('/login', JSON.stringify({ username: username, password: password }), { observe: 'response' }).pipe(
            map((response: HttpResponse<any>) => {
                // login successful if there's a jwt token in the response
                this.userLoggedInSubject.next();

                return;
            }),
            catchError(x => {
                return throwError(x);
            })
        );
    }

    logout() {
        // remove user from local storage to log user out
        return this.http.get('/logout').pipe(
            timeout(1000),
            catchError(() => {
                return of();
            }),
            tap(() => {
                this.reset();
                this.userLoggedOutSubject.next();
            })
        );
    }

    loadTokenFromCookie() {
        const token = this.getCookie('weflat_token');
        if (token) {
            this._isLoggedIn = true;
            const tokenPayload = jwt_decode(token);
            this._tokenPayload = tokenPayload;
            this._isAdmin = tokenPayload.roles.map(x => x.authority).includes('admin');
            this._isCustomer = tokenPayload.roles.map(x => x.authority).includes('customer');
            this._isArchitect = tokenPayload.roles.map(x => x.authority).includes('architect');
            this._userId = tokenPayload.id;
            this._userEmail = tokenPayload.sub;
            this._displayName = tokenPayload.displayName;
        } else {
            this.reset();
        }
    }

    reset() {
        this._isLoggedIn = false;
        this._tokenPayload = null;
        this._isAdmin = false;
        this._isCustomer = false;
        this._isArchitect = false;
        this._userId = null;
        this._userEmail = null;
        this._displayName = null;
    }

    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }

    get isAdmin(): boolean {
        return this._isAdmin;
    }

    get isArchitect(): boolean {
        return this._isArchitect;
    }

    get isCustomer(): boolean {
        return this._isCustomer;
    }

    get userLoggedIn(): Observable<any> {
        return this.userLoggedInSubject.asObservable();
    }

    get userLoggedOut(): Observable<any> {
        return this.userLoggedOutSubject.asObservable();
    }

    get userId(): number {
        return this._userId;
    }

    get userEmail(): string {
        return this._userEmail;
    }

    get displayName(): string {
        return this._displayName;
    }

    get tokenPayload(): any {
        return this._tokenPayload;
    }

    getCookie(name) {
        const value = '; ' + document.cookie;
        const parts = value.split('; ' + name + '=');
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
    }
}
