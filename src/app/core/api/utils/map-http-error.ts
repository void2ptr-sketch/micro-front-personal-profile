import { HttpErrorResponse } from '@angular/common/http';

import type { LocaleService } from '../../../features/locale/service/locale.service';
import { ApiClientError } from '../api-client.error';
import type { ApiErrorResponse } from '../api.types';

export const mapHttpError = (
  error: HttpErrorResponse,
  localeService: LocaleService,
): ApiClientError => {
  if (error.error && typeof error.error === 'object' && 'error' in error.error) {
    const body = error.error as ApiErrorResponse;
    return new ApiClientError(body.error.message, error.status, body.error.code);
  }

  if (error.status === 0) {
    return new ApiClientError(
      localeService.translate('api.error.network'),
      error.status,
      'NETWORK',
    );
  }

  if (error.status === 401) {
    return new ApiClientError(
      localeService.translate('api.error.unauthorized'),
      error.status,
      'UNAUTHORIZED',
    );
  }

  if (error.status === 404) {
    return new ApiClientError(
      localeService.translate('api.error.notFound'),
      error.status,
      'NOT_FOUND',
    );
  }

  if (error.status >= 500) {
    return new ApiClientError(localeService.translate('api.error.server'), error.status, 'SERVER');
  }

  return new ApiClientError(localeService.translate('api.error.unknown'), error.status, 'UNKNOWN');
};
