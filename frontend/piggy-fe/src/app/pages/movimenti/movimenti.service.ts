import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CategoriaMovimento, RicercaMovimentiResponse } from './movimenti.model';

@Injectable({ providedIn: 'root' })
export class MovimentiService {
  private readonly apiUrl = 'http://localhost:3000/api';

  constructor(private readonly http: HttpClient) {}

  ricerca(filtri: { numero: number; categoriaId?: string; dal?: string; al?: string; saldo?: boolean }) {
    let params = new HttpParams().set('limit', Math.max(1, filtri.numero));
    if (filtri.categoriaId) params = params.set('categoryId', filtri.categoriaId);
    if (filtri.dal) params = params.set('from', filtri.dal);
    if (filtri.al) params = params.set('to', filtri.al);
    if (filtri.saldo) params = params.set('withBalance', 'true');

    return this.http.get<RicercaMovimentiResponse>(`${this.apiUrl}/movements`, {
      params,
      headers: this.authHeaders(),
    });
  }

  categorie() {
    return this.http.get<CategoriaMovimento[]>(`${this.apiUrl}/categories`, {
      headers: this.authHeaders(),
    });
  }

  private authHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('piggybank_token') ?? ''}` });
  }
}
