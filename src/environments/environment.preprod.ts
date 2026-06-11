import { createEnvironment } from './create-environment';

export const environment = createEnvironment({
  contour: 'preprod',
  production: true,
  apiUrl: 'https://preprod.personal-profile.example/api',
  useMockApi: false,
});
