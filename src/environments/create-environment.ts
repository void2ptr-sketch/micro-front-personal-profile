import type { AppContour } from '../app/core/domain/profile-domain.types';

import type { AppEnvironment } from './environment.types';

type EnvironmentConfig = {
  readonly contour: AppContour;
  readonly production: boolean;
  readonly apiUrl: string;
  readonly useMockApi: boolean;
};

export const createEnvironment = (config: EnvironmentConfig): AppEnvironment => ({
  appName: 'personal-profile',
  ...config,
});
