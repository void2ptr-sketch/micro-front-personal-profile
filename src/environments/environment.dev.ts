import { createEnvironment } from './create-environment';

export const environment = createEnvironment({
  contour: 'dev',
  production: false,
  apiUrl: 'https://dev.personal-profile.example/api',
  useMockApi: false,
});
