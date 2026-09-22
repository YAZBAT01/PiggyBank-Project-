import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessLog } from '../models/log.models';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private http = inject(HttpClient);

  private apiUrl = 'https://api.tuodominio.com/v1';

  getLogs(): Observable<AccessLog[]> {
    return this.http.get<AccessLog[]>(
      `${this.apiUrl}/logs`
    );
  }
}