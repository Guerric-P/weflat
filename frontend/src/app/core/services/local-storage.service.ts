import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  get token(): string {
    return localStorage.getItem('jwtToken');
  }

  set token(token: string) {
    if (token) {
      localStorage.setItem('jwtToken', token);
    }
  }

  get tokenPayload(): any {
    const tokenPayload = localStorage.getItem('tokenPayload');
    if (tokenPayload) {
      return JSON.parse(tokenPayload);
    } else {
      return null;
    }
  }

  set tokenPayload(payload: any) {
    if (payload) {
      if (typeof payload === 'object') {
        localStorage.setItem('tokenPayload', JSON.stringify(payload));
      }
      if (typeof payload === 'string') {
        localStorage.setItem('tokenPayload', payload);
      }
    }
  }

  removeToken() {
    localStorage.removeItem('jwtToken');
  }

  removeTokenPayload() {
    localStorage.removeItem('tokenPayload');
  }

}
