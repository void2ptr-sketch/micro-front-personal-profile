import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { SecurityService } from '../service/security.service';
import { MIN_PASSWORD_LENGTH } from '../security.constants';

@Component({
  selector: 'app-security',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslatePipe,
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

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { currentPassword, newPassword, confirmPassword } = this.form.getRawValue();

    await this.securityService.changePassword({
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
