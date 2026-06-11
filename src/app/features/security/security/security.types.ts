export type PasswordChangeStatus = 'idle' | 'submitting' | 'success' | 'error';

export type PasswordChangeRequest = {
  readonly currentPassword: string;
  readonly newPassword: string;
  readonly confirmPassword: string;
};

export type PasswordValidationError = {
  readonly field: 'currentPassword' | 'newPassword' | 'confirmPassword' | 'form';
  readonly message: string;
};
