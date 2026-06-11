import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { APP_ENVIRONMENT } from '../../config/app-environment.token';
import type { ApiResponse, PasswordChangePayload, PasswordChangeResult } from '../api.types';

@Injectable({ providedIn: 'root' })
export class SecurityApiService {
  private readonly http = inject(HttpClient);
  private readonly environment = inject(APP_ENVIRONMENT);

  changePassword(payload: PasswordChangePayload): Observable<ApiResponse<PasswordChangeResult>> {
    return this.http.post<ApiResponse<PasswordChangeResult>>(
      `${this.environment.apiUrl}/security/password`,
      payload,
    );
  }
}
