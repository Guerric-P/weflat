import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as jwt_decode from 'jwt-decode';
import { LocalStorageService } from 'app/services/local-storage.service';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }
 
    login(username: string, password: string) {
        return this.http.post('/backend/login', JSON.stringify({ username: username, password: password }))
            .map((response: any) => {
                // login successful if there's a jwt token in the response
                let user:any = null;
                /*response.json().then(x => user = x);
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }*/
                this.localStorageService.token = response.token;
                this.localStorageService.tokenPayload = JSON.stringify(this.decodeJWT(response.token));
 
                return user;
            }).catch(x =>{
                return Observable.throw(x);
            });
          }
 
    logout() {
        // remove user from local storage to log user out
        this.http.get("/backend/logout", { responseType: 'text'}).subscribe();
        this.localStorageService.removeToken();
        this.localStorageService.removeTokenPayload();
    }

    private decodeJWT = function(token) {
        return jwt_decode(token);
    }
}
