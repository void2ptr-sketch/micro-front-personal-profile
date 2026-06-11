import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { authInterceptor } from './interceptors/auth.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';
import { mockApiInterceptor } from './interceptors/mock-api.interceptor';

const apiInterceptors = environment.useMockApi
  ? [authInterceptor, mockApiInterceptor, errorInterceptor]
  : [authInterceptor, errorInterceptor];

export const provideHttpApi = () => provideHttpClient(withInterceptors(apiInterceptors));
