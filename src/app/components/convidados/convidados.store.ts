import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guest } from '../kit/model-config/guest.class';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConvidadosStore {
 private readonly API = "http://localhost:8080/guest";

  constructor(private http: HttpClient, private authService: AuthService) {}

  findById(gId: number): Observable<Guest> {
    const headers = this.authService.getAuthTokenInNewHeader();
    const params = new HttpParams().set("gId", gId.toString());
    return this.http.get<Guest>(this.API, { params, headers });
  }

  findAllByUser(): Observable<Guest[]> {
    const headers = this.authService.getAuthTokenInNewHeader();
    return this.http.get<Guest[]>(`${this.API}/user`, { headers });
  }

  create(guest: Guest): Observable<void> {
    const headers = this.authService.getAuthTokenInNewHeader();
    return this.http.put<void>(this.API, { headers, guest });
  }

  update(guest: Guest, gId: number): Observable<void> {
    const headers = this.authService.getAuthTokenInNewHeader();
    let params = new HttpParams().set("gId", gId);
    return this.http.put<void>(this.API, { headers, params, guest });
  }

  delete(gId: number): Observable<void> {
    const headers = this.authService.getAuthTokenInNewHeader();
    let params = new HttpParams().set("gId", gId);
    return this.http.delete<void>(this.API, { headers, params });
  }
}
