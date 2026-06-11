import type { AppContour } from '../app/core/domain/profile-domain.types';

export type AppEnvironment = {
  readonly production: boolean;
  readonly appName: string;
  readonly apiUrl: string;
  readonly contour: AppContour;
};
