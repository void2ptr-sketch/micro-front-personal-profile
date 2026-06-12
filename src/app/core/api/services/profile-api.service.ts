import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { APP_ENVIRONMENT } from '../../config/app-environment.token';
import type { PersonalProfile } from '../../domain/profile-domain.types';
import type { ApiResponse } from '../api.types';

@Injectable()
export class ProfileApiService {
  private readonly http = inject(HttpClient);
  private readonly environment = inject(APP_ENVIRONMENT);

  getProfile(): Observable<ApiResponse<PersonalProfile>> {
    return this.http.get<ApiResponse<PersonalProfile>>(`${this.environment.apiUrl}/profile`);
  }
}
