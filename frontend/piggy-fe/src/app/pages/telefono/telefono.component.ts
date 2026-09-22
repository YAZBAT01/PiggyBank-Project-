import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TelefonoService } from './telefono.service';
import { RicaricaTelefonoRequest } from './telefono.model';

@Component({
  selector: 'app-telefono',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './telefono.component.html',
  styleUrls: ['./telefono.component.css']
})
export class TelefonoComponent implements OnInit {
  ricaricaForm!: FormGroup;
  operatori: string[] = ['Iliad', 'TIM', 'Vodafone', 'WindTre', 'Fastweb'];
  tagli: number[] = [5, 10, 20, 30, 50];
  
  messaggioEsito: string = '';
  isError: boolean = false;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private telefonoService: TelefonoService
  ) {}

  ngOnInit(): void {
    this.ricaricaForm = this.fb.group({
      numeroTelefono: ['', [Validators.required, Validators.pattern('^[0-9]{9,10}$')]],
      operatore: ['', Validators.required],
      taglio: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.ricaricaForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.messaggioEsito = '';

    const payload: RicaricaTelefonoRequest = this.ricaricaForm.value;

    this.telefonoService.effettuaRicarica(payload).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.isError = false;
          this.messaggioEsito = response.messaggio || 'Ricarica effettuata con successo!';
          this.ricaricaForm.reset();
        } else {
          this.isError = true;
          this.messaggioEsito = response.messaggio || 'Saldo insufficiente o operazione fallita.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.isError = true;
        this.messaggioEsito = err.error?.messaggio || 'Errore di connessione durante la ricarica.';
      }
    });
  }
}