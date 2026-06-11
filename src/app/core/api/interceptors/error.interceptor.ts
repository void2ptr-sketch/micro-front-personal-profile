import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { LocaleService } from '../../../features/locale/service/locale.service';
import { mapHttpError } from '../utils/map-http-error';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const localeService = inject(LocaleService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => throwError(() => mapHttpError(error, localeService))),
  );
};
