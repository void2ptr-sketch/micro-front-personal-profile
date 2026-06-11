import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MIN_PASSWORD_LENGTH } from './security.constants';
import { SecurityService } from './security.service';

@Component({
  selector: 'app-security',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './security.component.html',
  styleUrl: './security.component.scss',
})
export class SecurityComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  readonly securityService = inject(SecurityService);

  readonly minPasswordLength = MIN_PASSWORD_LENGTH;

  readonly form = this.formBuilder.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)]],
    confirmPassword: ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { currentPassword, newPassword, confirmPassword } = this.form.getRawValue();

    this.securityService.changePassword({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    if (this.securityService.isSuccess()) {
      this.form.reset();
    }
  }

  resetState(): void {
    this.securityService.resetFormState();
    this.form.reset();
  }
}
