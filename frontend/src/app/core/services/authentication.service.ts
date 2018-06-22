import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError, timeout } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthenticationService {

    private userLoggedInSubject: Subject<any> = new Subject<any>();
    private userLoggedOutSubject: Subject<any> = new Subject<any>();

    public returnUrl: string;

    constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

    login(username: string, password: string) {
        return this.http.post('/login', JSON.stringify({ username: username, password: password })).pipe(
            map((response: any) => {
                // login successful if there's a jwt token in the response
                this.localStorageService.token = response.token;
                this.localStorageService.tokenPayload = JSON.stringify(this.decodeJWT(response.token));
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
        this.localStorageService.removeToken();
        this.localStorageService.removeTokenPayload();
        this.userLoggedOutSubject.next();
        return this.http.get('/logout').pipe(
            timeout(1000)
        );
    }

    private decodeJWT = function (token) {
        return jwt_decode(token);
    }

    get isLoggedIn(): boolean {
        return this.localStorageService.token && this.localStorageService.tokenPayload;
    }

    get isAdmin(): boolean {
        return this.localStorageService.tokenPayload
            ? this.localStorageService.tokenPayload.roles.map(x => x.authority).includes('admin')
            : false;
    }

    get isArchitect(): boolean {
        return this.localStorageService.tokenPayload
            ? this.localStorageService.tokenPayload.roles.map(x => x.authority).includes('architect')
            : false;
    }

    get isCustomer(): boolean {
        return this.localStorageService.tokenPayload
            ? this.localStorageService.tokenPayload.roles.map(x => x.authority).includes('customer')
            : false;
    }

    get userLoggedIn(): Observable<any> {
        return this.userLoggedInSubject.asObservable();
    }

    get userLoggedOut(): Observable<any> {
        return this.userLoggedOutSubject.asObservable();
    }

    get userId(): number {
        return this.localStorageService.tokenPayload ? this.localStorageService.tokenPayload.id : null;
    }

    get userEmail(): string {
        return this.localStorageService.tokenPayload ? this.localStorageService.tokenPayload.sub : null;
    }
}
