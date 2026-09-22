import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TelefonoService } from './telefono.service';
import { RicaricaTelefonoRequest, Movimento } from './telefono.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-telefono',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './telefono.component.html',
  styleUrls: ['./telefono.component.css']
})
export class TelefonoComponent implements OnInit {
  ricaricaForm!: FormGroup;

  operatori: string[] = ['TIM', 'Vodafone', 'Wind Tre', 'Iliad', 'Ho. Mobile', 'Fastweb Mobile'];
  tagli: number[] = [5, 10, 15, 20, 25, 30, 50];

  saldo$!: Observable<number>;
  movimenti$!: Observable<Movimento[]>;

  messaggioEsito: string = '';
  isError: boolean = false;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private telefonoService: TelefonoService
  ) {}

  ngOnInit(): void {
    this.saldo$ = this.telefonoService.saldo$;
    this.movimenti$ = this.telefonoService.movimenti$;

    this.ricaricaForm = this.fb.group({
      numeroTelefono: ['', [Validators.required, Validators.pattern('^(\\+39)?\\s?[0-9]{9,10}$')]],
      operatore: ['', Validators.required],
      taglio: [null, Validators.required],
      importoPersonalizzato: [null]
    });

    this.ricaricaForm.get('importoPersonalizzato')?.valueChanges.subscribe(val => {
      if (val && val > 0) {
        this.ricaricaForm.get('taglio')?.setValue(Number(val), { emitEvent: false });
      }
    });
  }

  selectOperatore(op: string): void {
    this.ricaricaForm.get('operatore')?.setValue(op);
  }

  selectTaglio(t: number): void {
    this.ricaricaForm.get('taglio')?.setValue(t);
    this.ricaricaForm.get('importoPersonalizzato')?.setValue(null, { emitEvent: false });
  }

  onSubmit(): void {
    if (this.ricaricaForm.invalid) {
      this.ricaricaForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.messaggioEsito = '';

    const payload: RicaricaTelefonoRequest = {
      numeroTelefono: this.ricaricaForm.value.numeroTelefono,
      operatore: this.ricaricaForm.value.operatore,
      taglio: Number(this.ricaricaForm.value.taglio)
    };

    this.telefonoService.effettuaRicarica(payload).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.isError = !response.success;
        this.messaggioEsito = response.messaggio;

        if (response.success) {
          this.ricaricaForm.reset();
        }
      },
      error: () => {
        this.isLoading = false;
        this.isError = true;
        this.messaggioEsito = 'Errore di sistema durante la richiesta.';
      }
    });
  }
}