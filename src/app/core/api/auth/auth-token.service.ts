import { Injectable, signal } from '@angular/core';

const AUTH_TOKEN_STORAGE_KEY = 'personal-profile.auth-token';

@Injectable()
export class AuthTokenService {
  private readonly tokenSignal = signal<string | null>(this.readStoredToken());

  readonly token = this.tokenSignal.asReadonly();

  setToken(token: string): void {
    sessionStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
    this.tokenSignal.set(token);
  }

  clearToken(): void {
    sessionStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    this.tokenSignal.set(null);
  }

  private readStoredToken(): string | null {
    return sessionStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  }
}
