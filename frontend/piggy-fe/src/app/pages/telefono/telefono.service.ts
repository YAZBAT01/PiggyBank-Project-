import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, delay } from 'rxjs';
import { RicaricaTelefonoRequest, RicaricaTelefonoResponse, Movimento } from './telefono.model';

@Injectable({
  providedIn: 'root'
})
export class TelefonoService {
  // Saldo iniziale simulato
  private saldoSubject = new BehaviorSubject<number>(4287.50);
  saldo$: Observable<number> = this.saldoSubject.asObservable();

  // Storico movimenti simulato
  private movimentiFake: Movimento[] = [
    {
      id: 'MOV-001',
      data: new Date('2026-09-20T10:30:00'),
      descrizione: 'Ricarica Iliad 3331234567',
      categoria: 'Ricarica Telefonica',
      importo: -10.00,
      esito: 'OK',
      indirizzoIP: '192.168.1.45'
    },
    {
      id: 'MOV-002',
      data: new Date('2026-09-18T14:15:00'),
      descrizione: 'Supermercato Conad',
      categoria: 'Shopping',
      importo: -32.80,
      esito: 'OK',
      indirizzoIP: '192.168.1.45'
    }
  ];

  private movimentiSubject = new BehaviorSubject<Movimento[]>(this.movimentiFake);
  movimenti$: Observable<Movimento[]> = this.movimentiSubject.asObservable();

  effettuaRicarica(data: RicaricaTelefonoRequest): Observable<RicaricaTelefonoResponse> {
    const importoRicarica = Number(data.taglio);
    const saldoAttuale = this.saldoSubject.getValue();
    const ipFittizio = '192.168.1.' + Math.floor(Math.random() * 255);

    // 1. Verifica saldo disponibile
    if (saldoAttuale < importoRicarica) {
      const movimentoFallito: Movimento = {
        id: 'MOV-' + Math.floor(1000 + Math.random() * 9000),
        data: new Date(),
        descrizione: `Ricarica ${data.operatore} (${data.numeroTelefono}) - Saldo Insufficiente`,
        categoria: 'Ricarica Telefonica',
        importo: -importoRicarica,
        esito: 'FALLITO',
        indirizzoIP: ipFittizio
      };

      this.aggiungiMovimento(movimentoFallito);

      return of({
        success: false,
        messaggio: `Saldo insufficiente! Disponibile: €${saldoAttuale.toFixed(2)}.`
      }).pipe(delay(600));
    }

    // 2. Se il saldo è sufficiente
    const nuovoSaldo = saldoAttuale - importoRicarica;
    this.saldoSubject.next(nuovoSaldo);

    const nuovoMovimento: Movimento = {
      id: 'MOV-' + Math.floor(1000 + Math.random() * 9000),
      data: new Date(),
      descrizione: `Ricarica ${data.operatore} (${data.numeroTelefono})`,
      categoria: 'Ricarica Telefonica',
      importo: -importoRicarica,
      esito: 'OK',
      indirizzoIP: ipFittizio
    };

    this.aggiungiMovimento(nuovoMovimento);

    return of({
      success: true,
      messaggio: `Ricarica di €${importoRicarica} effettuata con successo!`,
      nuovoSaldo: nuovoSaldo,
      movimentoCreato: nuovoMovimento
    }).pipe(delay(600));
  }

  private aggiungiMovimento(movimento: Movimento) {
    const attuali = this.movimentiSubject.getValue();
    this.movimentiSubject.next([movimento, ...attuali]);
  }
}