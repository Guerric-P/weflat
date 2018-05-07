import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  changePassword(id: number, password: string){
    return this.http.put(`/users/${id}/password`, {password: password});
  }
}
