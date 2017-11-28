import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TestService {

  constructor(private http: HttpClient) { }

  getTest(){
    return this.http.get("/backend/test").map((response: any) => {
      return response.valeur;
    });
  }

}
