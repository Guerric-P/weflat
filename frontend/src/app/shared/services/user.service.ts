import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  changePassword(id: number, password: string) {
    return this.http.put(`/users/${id}/password`, {password: password});
  }

  forgottenPassword(email: string) {
    return this.http.post(`/users/forgotten-password`, null, {params: {email}});
  }

  resetPassword(hash: string, password: string) {
    return this.http.post(`/users/reset-password`, null, {params: {hash, password}})
  }
}
