import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CategoriaMovimento, Movimento } from './movimenti.model';
import { MovimentiService } from './movimenti.service';

type ModalitaRicerca = 'ultimi' | 'categoria' | 'periodo';

@Component({
  selector: 'app-movimenti',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe, DatePipe, RouterLink, RouterLinkActive],
  templateUrl: './movimenti.component.html',
  styleUrl: './movimenti.component.css',
})
export class MovimentiComponent implements OnInit {
  modalita: ModalitaRicerca = 'ultimi';
  numero = 5;
  categoriaId = '';
  tipo = '';
  testo = '';
  dal = '';
  al = '';
  saldo?: number;
  movimenti: Movimento[] = [];
  categorie: CategoriaMovimento[] = [];
  messaggio = '';
  caricamento = false;

  constructor(private readonly movimentiService: MovimentiService) {}

  ngOnInit(): void {
    this.movimentiService.categorie().subscribe({ next: categorie => this.categorie = categorie });
    this.cerca();
  }

  cambiaModalita(modalita: ModalitaRicerca): void {
    this.modalita = modalita;
    this.messaggio = '';
    this.saldo = undefined;
    this.movimenti = [];
  }

  cerca(): void {
    if (this.modalita === 'periodo' && this.dal && this.al && this.dal > this.al) {
      this.messaggio = 'La data iniziale deve essere precedente alla data finale.';
      return;
    }

    this.caricamento = true;
    this.messaggio = '';
    this.movimentiService.ricerca({
      numero: this.numero,
      ...(this.modalita === 'categoria' && this.categoriaId ? { categoriaId: this.categoriaId } : {}),
      ...(this.modalita === 'periodo' && this.dal ? { dal: this.dal } : {}),
      ...(this.modalita === 'periodo' && this.al ? { al: this.al } : {}),
      saldo: this.modalita === 'ultimi',
    }).subscribe({
      next: risposta => {
        this.movimenti = risposta.movements.filter(movimento =>
          (!this.tipo || movimento.category.type === this.tipo) &&
          (!this.testo || `${movimento.description ?? ''} ${movimento.reference ?? ''}`.toLowerCase().includes(this.testo.toLowerCase())));
        this.saldo = risposta.balance;
        this.caricamento = false;
      },
      error: errore => {
        this.messaggio = errore.error?.message ?? 'Impossibile caricare i movimenti.';
        this.caricamento = false;
      },
    });
  }

  resetFiltri(): void {
    this.numero = 10; this.categoriaId = ''; this.tipo = ''; this.testo = ''; this.dal = ''; this.al = '';
    this.cerca();
  }

  get totaleAccrediti(): number { return this.movimenti.filter(m => m.amount > 0).reduce((totale, m) => totale + m.amount, 0); }
  get totaleAddebiti(): number { return this.movimenti.filter(m => m.amount < 0).reduce((totale, m) => totale + Math.abs(m.amount), 0); }
  get saldoPeriodo(): number { return this.totaleAccrediti - this.totaleAddebiti; }

  esportaCsv(): void {
    const righe = [
      ['Data', 'Importo', 'NomeCategoria'],
      ...this.movimenti.map(movimento => [movimento.date, movimento.amount.toFixed(2), movimento.category.name]),
    ];
    const contenuto = righe
      .map(riga => riga.map(valore => `"${String(valore).replace(/"/g, '""')}"`).join(';'))
      .join('\r\n');
    const url = URL.createObjectURL(new Blob(['\uFEFF', contenuto], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `movimenti-${this.modalita}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
