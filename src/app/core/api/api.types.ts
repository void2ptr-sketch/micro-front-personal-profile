export type ApiErrorBody = {
  readonly code: string;
  readonly message: string;
};

export type ApiResponse<T> = {
  readonly data: T;
};

export type ApiErrorResponse = {
  readonly error: ApiErrorBody;
};

export type PasswordChangePayload = {
  readonly currentPassword: string;
  readonly newPassword: string;
};

export type PasswordChangeResult = {
  readonly changed: boolean;
};
