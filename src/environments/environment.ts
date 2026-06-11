import type { AppEnvironment } from './environment.types';

export const environment: AppEnvironment = {
  production: false,
  appName: 'personal-profile',
  apiUrl: 'http://localhost:3000/api',
  contour: 'dev',
  useMockApi: true,
};
