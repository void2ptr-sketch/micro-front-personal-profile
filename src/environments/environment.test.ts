import { createEnvironment } from './create-environment';

export const environment = createEnvironment({
  contour: 'test',
  production: false,
  apiUrl: 'https://test.personal-profile.example/api',
  useMockApi: false,
});
