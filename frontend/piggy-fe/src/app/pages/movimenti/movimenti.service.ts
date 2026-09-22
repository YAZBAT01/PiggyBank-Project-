import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CategoriaMovimento, Movimento, RicercaMovimentiResponse } from './movimenti.model';

const MOCK_CATEGORIE: CategoriaMovimento[] = [
  { _id: 'stipendio', name: 'Stipendio', type: 'Entrata' },
  { _id: 'spesa', name: 'Spesa alimentare', type: 'Uscita' },
  { _id: 'bollette', name: 'Pagamento Utenze', type: 'Uscita' },
  { _id: 'bonifico', name: 'Bonifico Entrata', type: 'Entrata' },
  { _id: 'trasporti', name: 'Trasporti', type: 'Uscita' },
];

const MOCK_MOVIMENTI: Movimento[] = [
  { id: '1', date: '2026-09-20T10:30:00', amount: -42.50, description: 'Spesa Esselunga', reference: 'REF-012', category: { id: 'spesa', name: 'Spesa alimentare', type: 'Uscita' } },
  { id: '2', date: '2026-09-19T09:00:00', amount: 1850, description: 'Stipendio mensile', reference: 'REF-011', category: { id: 'stipendio', name: 'Stipendio', type: 'Entrata' } },
  { id: '3', date: '2026-09-18T18:15:00', amount: -12.90, description: 'Abbonamento trasporti', reference: 'REF-010', category: { id: 'trasporti', name: 'Trasporti', type: 'Uscita' } },
  { id: '4', date: '2026-09-16T08:45:00', amount: -89.99, description: 'Pagamento bolletta luce', reference: 'REF-009', category: { id: 'bollette', name: 'Pagamento Utenze', type: 'Uscita' } },
  { id: '5', date: '2026-09-14T20:00:00', amount: 120, category: { id: 'bonifico', name: 'Bonifico Entrata', type: 'Entrata' } },
  { id: '6', date: '2026-09-11T12:00:00', amount: -67.40, category: { id: 'spesa', name: 'Spesa alimentare', type: 'Uscita' } },
  { id: '7', date: '2026-09-08T07:30:00', amount: -9.50, category: { id: 'trasporti', name: 'Trasporti', type: 'Uscita' } },
  { id: '8', date: '2026-09-05T16:30:00', amount: -55, category: { id: 'spesa', name: 'Spesa alimentare', type: 'Uscita' } },
];

@Injectable({ providedIn: 'root' })
export class MovimentiService {
  private readonly apiUrl = 'http://localhost:3000/api';
  private readonly useMockData = true;

  constructor(private readonly http: HttpClient) {}

  ricerca(filtri: { numero: number; categoriaId?: string; dal?: string; al?: string; saldo?: boolean }): Observable<RicercaMovimentiResponse> {
    if (this.useMockData) {
      const movements = [...MOCK_MOVIMENTI]
        .filter(m => !filtri.categoriaId || m.category.id === filtri.categoriaId)
        .filter(m => !filtri.dal || m.date.slice(0, 10) >= filtri.dal)
        .filter(m => !filtri.al || m.date.slice(0, 10) <= filtri.al)
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, Math.max(1, filtri.numero));
      return of({ movements, ...(filtri.saldo && { balance: 2438.61 }) });
    }
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

  categorie(): Observable<CategoriaMovimento[]> {
    if (this.useMockData) return of(MOCK_CATEGORIE);
    return this.http.get<CategoriaMovimento[]>(`${this.apiUrl}/categories`, {
      headers: this.authHeaders(),
    });
  }

  private authHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('piggybank_token') ?? ''}` });
  }
}