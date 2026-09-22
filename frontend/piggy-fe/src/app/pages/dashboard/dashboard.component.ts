import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface Account {
  name: string;
  balance: number;
  iban: string;
}

interface Transaction {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number;
  icon: string;
  color: string;
  reference: string;
}

const CURRENCY_FORMATTER = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
});

// Pagina provvisoria: dati finti, servono solo per vedere il layout.
// Quando il servizio conti/movimenti sarà pronto, sostituiamo i mock con le chiamate reali.
@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  protected readonly firstname = inject(AuthService).getUser()?.firstname ?? '';

  protected readonly accounts: Account[] = [
    { name: 'Conto Corrente Principale', balance: 4287.5, iban: 'IT60 X054 2811 1010 0000 0123 456' },
    { name: 'Conto Risparmio', balance: 12540.0, iban: 'IT60 X054 2811 1010 0000 0987 654' },
  ];

  protected readonly monthlyIncome = 150.0;
  protected readonly monthlyExpenses = 538.68;

  protected readonly transactions: Transaction[] = [
    {
      id: 't1',
      title: 'Corso online Udemy',
      category: 'Istruzione',
      date: '21 set 2024',
      amount: -29.9,
      icon: '📚',
      color: '#3d5a99',
      reference: 'Rif. 84213',
    },
    {
      id: 't2',
      title: 'Stipendio',
      category: 'Entrate',
      date: '20 set 2024',
      amount: 1850.0,
      icon: '💰',
      color: '#1f8a4c',
      reference: 'Bonifico',
    },
    {
      id: 't3',
      title: 'Supermercato Esselunga',
      category: 'Spesa',
      date: '19 set 2024',
      amount: -84.32,
      icon: '🛒',
      color: '#c07a1e',
      reference: 'Carta ••42',
    },
    {
      id: 't4',
      title: 'Netflix',
      category: 'Abbonamenti',
      date: '18 set 2024',
      amount: -12.99,
      icon: '🎬',
      color: '#8a3d99',
      reference: 'Carta ••42',
    },
    {
      id: 't5',
      title: 'Bar Centrale',
      category: 'Ristorazione',
      date: '17 set 2024',
      amount: -18.5,
      icon: '☕',
      color: '#a3521f',
      reference: 'Carta ••42',
    },
  ];

  protected readonly selectedIndex = signal(0);
  protected readonly selectedAccount = computed(() => this.accounts[this.selectedIndex()]);
  protected readonly totalWealth = this.accounts.reduce((sum, account) => sum + account.balance, 0);

  protected selectAccount(index: number): void {
    this.selectedIndex.set(index);
  }

  protected formatCurrency(value: number): string {
    return CURRENCY_FORMATTER.format(value);
  }
}