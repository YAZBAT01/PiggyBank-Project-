import { ValidationErrors, ValidatorFn } from '@angular/forms';

// Almeno 8 caratteri, una maiuscola e un simbolo (come da OpenAPI)
export const passwordStrength: ValidatorFn = (control) => {
  const value: string = control.value ?? '';
  if (!value) return null; // se è vuota ci pensa Validators.required

  const errors: ValidationErrors = {};
  if (value.length < 8) errors['minLength'] = true;
  if (!/[A-Z]/.test(value)) errors['uppercase'] = true;
  if (!/[^A-Za-z0-9]/.test(value)) errors['symbol'] = true;

  return Object.keys(errors).length ? errors : null;
};

// Da applicare al gruppo: controlla che le due password coincidano
export const passwordsMatch: ValidatorFn = (group) => {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordsMismatch: true };
};