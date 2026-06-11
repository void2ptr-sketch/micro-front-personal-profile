import { createEnvironment } from './create-environment';

export const environment = createEnvironment({
  contour: 'local',
  production: false,
  apiUrl: 'http://localhost:3000/api',
  useMockApi: true,
});
