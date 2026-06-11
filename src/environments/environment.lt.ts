import { createEnvironment } from './create-environment';

export const environment = createEnvironment({
  contour: 'lt',
  production: false,
  apiUrl: 'https://lt.personal-profile.example/api',
  useMockApi: false,
});
