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

  getAuthToken(): string | null {
    const token = localStorage.getItem(this.authTokenKey);
    return token !== null ? token : this.defaultAuthToken;
  }
}