import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenKey = 'authToken';
  private defaultAuthToken = 'defaultToken';

  constructor() {}

  setAuthToken(token: string) {
    localStorage.setItem(this.authTokenKey, token);
  }

  getAuthTokenInNewHeader(): HttpHeaders {
    let token = localStorage.getItem(this.authTokenKey);
    token !== null ? token : this.defaultAuthToken;
    if (!token) {
      throw new Error('Token de autorização não encontrado');
    }
    return new HttpHeaders().set('Authorization', token);
  }

}