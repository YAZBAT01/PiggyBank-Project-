import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap, throwError, timer } from 'rxjs';
import {
  BankTransferRequest,
  OperationResponse,
} from '../models/bank-transfer.model';

@Injectable({ providedIn: 'root' })
export class BankTransferService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/v1';

  // Come per l'autenticazione, la pagina resta utilizzabile anche senza backend.
  // Impostare a false quando la WebApi sarà disponibile.
  private readonly useMock = true;

  transfer(data: BankTransferRequest): Observable<OperationResponse> {
    if (!this.useMock) {
      return this.http.post<OperationResponse>(
        `${this.baseUrl}/operations/bank-transfer`,
        data,
      );
    }

    const destinationIban = this.normalizeIban(data.destinationIban);

    if (destinationIban === 'IT60X0542811101000000345678') {
      return timer(650).pipe(
        switchMap(() =>
          of({
            success: true,
            message: 'Bonifico eseguito con successo.',
            transactionID: '65f1a2b3c4d5e6f7a8b90127',
            updatedBalance: 4287.5 - data.amount,
          }),
        ),
      );
    }

    return timer(650).pipe(
      switchMap(() =>
        throwError(
          () =>
            new Error(
              'IBAN destinatario non trovato. Verifica il dato inserito e riprova.',
            ),
        ),
      ),
    );
  }

  normalizeIban(iban: string): string {
    return iban.replace(/\s+/g, '').toUpperCase();
  }
}
