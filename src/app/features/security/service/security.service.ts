import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { ApiClientError } from '../../../core/api/api-client.error';
import { SecurityApiService } from '../../../core/api/services/security-api.service';
import { LocaleService } from '../../locale/service/locale.service';
import { MIN_PASSWORD_LENGTH } from '../security.constants';
import type { PasswordChangeRequest, PasswordChangeStatus } from '../security.types';

@Injectable({ providedIn: 'root' })
export class SecurityService {
  private readonly localeService = inject(LocaleService);
  private readonly securityApi = inject(SecurityApiService);
  private readonly statusSignal = signal<PasswordChangeStatus>('idle');
  private readonly errorSignal = signal<string | null>(null);
  private readonly successSignal = signal<string | null>(null);

  readonly status = this.statusSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly successMessage = this.successSignal.asReadonly();

  readonly isSubmitting = computed(() => this.statusSignal() === 'submitting');
  readonly isSuccess = computed(() => this.statusSignal() === 'success');

  changePassword(request: PasswordChangeRequest): Promise<void> {
    if (this.statusSignal() === 'submitting') {
      return Promise.resolve();
    }

    this.statusSignal.set('submitting');
    this.errorSignal.set(null);
    this.successSignal.set(null);

    const validationError = this.validateRequest(request);
    if (validationError) {
      this.setError(validationError);
      return Promise.resolve();
    }

    return firstValueFrom(
      this.securityApi.changePassword({
        currentPassword: request.currentPassword,
        newPassword: request.newPassword,
      }),
    )
      .then(() => {
        this.statusSignal.set('success');
        this.successSignal.set(this.localeService.translate('security.success.passwordChanged'));
      })
      .catch((error: unknown) => {
        const message =
          error instanceof ApiClientError
            ? error.message
            : this.localeService.translate('api.error.unknown');
        this.setError(message);
      });
  }

  resetFormState(): void {
    this.statusSignal.set('idle');
    this.errorSignal.set(null);
    this.successSignal.set(null);
  }

  private validateRequest(request: PasswordChangeRequest): string | null {
    if (!request.currentPassword.trim()) {
      return this.localeService.translate('security.error.currentRequired');
    }

    if (request.newPassword.length < MIN_PASSWORD_LENGTH) {
      return this.localeService.translate('security.error.minLength', {
        PH: String(MIN_PASSWORD_LENGTH),
      });
    }

    if (request.newPassword !== request.confirmPassword) {
      return this.localeService.translate('security.error.mismatch');
    }

    if (request.currentPassword === request.newPassword) {
      return this.localeService.translate('security.error.samePassword');
    }

    return null;
  }

  private setError(message: string): void {
    this.statusSignal.set('error');
    this.errorSignal.set(message);
  }
}
