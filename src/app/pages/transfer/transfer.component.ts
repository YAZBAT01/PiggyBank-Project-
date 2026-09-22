import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs';
import { BankTransferService } from '../../services/bank-transfer.service';

const CURRENCY_FORMATTER = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
});

@Component({
  selector: 'app-transfer',
  imports: [ReactiveFormsModule],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css',
})
export class TransferComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly transferService = inject(BankTransferService);

  protected readonly balance = 4287.5;
  protected readonly testIban = 'IT60 X054 2811 1010 0000 0345 678';
  protected readonly isSubmitting = signal(false);
  protected readonly successMessage = signal<string | null>(null);
  protected readonly errorMessage = signal<string | null>(null);

  protected readonly transferForm = this.formBuilder.nonNullable.group({
    destinationIban: ['', [Validators.required]],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    description: [''],
  });

  protected formatCurrency(value: number): string {
    return CURRENCY_FORMATTER.format(value);
  }

  protected isInvalid(controlName: 'destinationIban' | 'amount'): boolean {
    const control = this.transferForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  protected submit(): void {
    this.successMessage.set(null);
    this.errorMessage.set(null);

    this.transferForm.markAllAsTouched();

    const amount = this.transferForm.controls.amount.value;
    if (amount > this.balance) {
      this.errorMessage.set('Saldo insufficiente per eseguire il bonifico.');
      return;
    }

    if (this.transferForm.invalid) {
      return;
    }

    const raw = this.transferForm.getRawValue();
    const destinationIban = this.transferService.normalizeIban(raw.destinationIban);

    this.isSubmitting.set(true);

    this.transferService
      .transfer({
        destinationIban,
        amount,
        // Il contratto API richiede la description, mentre nella UI la causale è opzionale.
        description: raw.description.trim() || 'Bonifico',
      })
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: (response) => {
          this.successMessage.set(response.message);
          this.transferForm.reset({
            destinationIban: '',
            amount: 0,
            description: '',
          });
        },
        error: (error: Error) => {
          this.errorMessage.set(
            error?.message || 'Non è stato possibile eseguire il bonifico.',
          );
        },
      });
  }
}

export default TransferComponent;
