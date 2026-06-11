import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { of } from 'rxjs';

import { APP_ENVIRONMENT } from '../../config/app-environment.token';
import { createInitialProfile } from '../../models/profile.models';
import type { ApiResponse, PasswordChangeResult } from '../api.types';

export const mockApiInterceptor: HttpInterceptorFn = (request, next) => {
  const environment = inject(APP_ENVIRONMENT);

  if (!environment.useMockApi) {
    return next(request);
  }

  const profileUrl = `${environment.apiUrl}/profile`;
  const passwordUrl = `${environment.apiUrl}/security/password`;

  if (request.method === 'GET' && request.url === profileUrl) {
    const body: ApiResponse<ReturnType<typeof createInitialProfile>> = {
      data: createInitialProfile(),
    };
    return of(new HttpResponse({ status: 200, body }));
  }

  if (request.method === 'POST' && request.url === passwordUrl) {
    const body: ApiResponse<PasswordChangeResult> = {
      data: { changed: true },
    };
    return of(new HttpResponse({ status: 200, body }));
  }

  return next(request);
};
