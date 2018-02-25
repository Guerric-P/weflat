import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { catchError } from 'rxjs/operators/catchError';
import * as jwt_decode from 'jwt-decode';
import { LocalStorageService } from 'app/services/local-storage.service';
import { Subject } from 'rxjs';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

    private userLoggedInSubject: Subject<any> = new Subject<any>();
    private userLoggedOutSubject: Subject<any> = new Subject<any>();

    public returnUrl: string;

    login(username: string, password: string) {
        return this.http.post('/login', JSON.stringify({ username: username, password: password }))
            .map((response: any) => {
                // login successful if there's a jwt token in the response
                this.localStorageService.token = response.token;
                this.localStorageService.tokenPayload = JSON.stringify(this.decodeJWT(response.token));
                this.userLoggedInSubject.next();

                return;
            }).pipe(catchError(x => {
                return ErrorObservable.create(x);
            }));
    }

    logout() {
        // remove user from local storage to log user out
        this.localStorageService.removeToken();
        this.localStorageService.removeTokenPayload();
        this.userLoggedOutSubject.next();
        return this.http.get('/logout').timeout(1000);
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
            ? this.localStorageService.tokenPayload.roles.map(x => x.authority).includes('architecte')
            : false;
    }

    get isCustomer(): boolean {
        return this.localStorageService.tokenPayload
            ? this.localStorageService.tokenPayload.roles.map(x => x.authority).includes('acheteur')
            : false;
    }

    get userLoggedIn(): Observable<any> {
        return this.userLoggedInSubject.asObservable();
    }

    get userLoggedOut(): Observable<any> {
        return this.userLoggedOutSubject.asObservable();
    }

    get userId(): number {
        return this.localStorageService.tokenPayload.id;
    }
}
