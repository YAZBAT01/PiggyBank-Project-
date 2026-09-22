import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RicaricaTelefonoRequest, RicaricaTelefonoResponse } from './telefono.model';

@Injectable({
  providedIn: 'root'
})
export class TelefonoService {
  private apiUrl = 'https://api.tuodominio.it/api/movimenti/ricarica-telefono';

  constructor(private http: HttpClient) {}

  effettuaRicarica(data: RicaricaTelefonoRequest): Observable<RicaricaTelefonoResponse> {
    return this.http.post<RicaricaTelefonoResponse>(this.apiUrl, data);
  }
}