import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { passwordsMatch, passwordStrength } from '../../utils/validators';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  // Se valorizzato, la registrazione è riuscita e mostriamo "controlla la email"
  protected readonly registeredEmail = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group(
    {
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordStrength]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordsMatch },
  );

  protected get firstname() {
    return this.form.controls.firstname;
  }

  protected get lastname() {
    return this.form.controls.lastname;
  }

  protected get email() {
    return this.form.controls.email;
  }

  protected get password() {
    return this.form.controls.password;
  }

  protected get confirmPassword() {
    return this.form.controls.confirmPassword;
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.auth.register(this.form.getRawValue()).subscribe({
      next: () => {
        this.loading.set(false);
        this.registeredEmail.set(this.email.value);
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        this.errorMessage.set(this.messageFor(err));
      },
    });
  }

  private messageFor(err: HttpErrorResponse): string {
    if (err.status === 400) {
      return 'Registrazione non riuscita. L\'email potrebbe essere già registrata: prova ad accedere oppure usa un altro indirizzo.';
    }
    if (err.status === 0) {
      return 'Impossibile contattare il server. Controlla la connessione e riprova.';
    }
    return 'Si è verificato un errore durante la registrazione. Riprova tra qualche istante.';
  }
}