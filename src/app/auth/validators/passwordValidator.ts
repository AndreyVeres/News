import { AbstractControl } from '@angular/forms';

export const passwordMatchValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
    return { passwordMismatch: true };
  }

  return null;
}
