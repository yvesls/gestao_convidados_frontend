import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../kit/model-config/user.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStore {
  private readonly API = "http://localhost:8080/login";

  constructor(private http: HttpClient) {
  }

  logar(user: User): Observable<any> {
    return this.http.post<any>(this.API, user, { observe: 'response' });
  }
}
