import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TypeGuest } from '../../kit/model-config/type-guest.class';

@Injectable({
  providedIn: 'root'
})
export class TipoConvidadosStore {
 private readonly API = "http://localhost:8080/typeguest";

  constructor(private http: HttpClient, private authService: AuthService) {}

  findById(gId: number): Observable<TypeGuest> {
    const headers = this.authService.getAuthTokenInNewHeader();
    const params = new HttpParams().set("gId", gId.toString());
    return this.http.get<TypeGuest>(this.API, { params, headers });
  }

  findAllByUser(): Observable<TypeGuest[]> {
    const headers = this.authService.getAuthTokenInNewHeader();
    return this.http.get<TypeGuest[]>(`${this.API}/user`, { headers });
  }

  create(guest: TypeGuest): Observable<void> {
    const headers = this.authService.getAuthTokenInNewHeader();
    return this.http.put<void>(this.API, { headers, guest });
  }

  update(guest: TypeGuest, gId: number): Observable<void> {
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
