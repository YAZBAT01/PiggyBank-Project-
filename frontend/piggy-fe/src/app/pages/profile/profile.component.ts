import { Component } from '@angular/core';

interface ProfileField {
  label: string;
  value: string;
}

interface AccountSummary {
  name: string;
  iban: string;
  balance: number;
}

const CURRENCY_FORMATTER = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
});

// Pagina provvisoria: dati finti, servono solo per vedere il layout.
// Quando il servizio utente sarà pronto, sostituiamo i mock con i dati reali.
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  protected readonly fullName = 'Marco Rossi';
  /*protected readonly memberSince = 'Cliente PiggyBank dal marzo 2023';*/

  protected readonly initials = this.fullName
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();

  protected readonly personalFields: ProfileField[] = [
    { label: 'Nome completo', value: this.fullName },
    { label: 'Email', value: 'marco.rossi@email.it' },
    { label: 'Telefono', value: '+39 331 456 7890' },
    { label: 'Codice Fiscale', value: 'RSSMRC85A01H501Z' },
  ];

  protected readonly accounts: AccountSummary[] = [
    { name: 'Conto Corrente Principale', iban: 'IT60 X054 2811 1010 0000 0123 456', balance: 4287.5 },
    { name: 'Conto Risparmio', iban: 'IT60 X054 2811 1010 0000 0789 012', balance: 12540.0 },
  ];

  protected formatCurrency(value: number): string {
    return CURRENCY_FORMATTER.format(value);
  }
}
