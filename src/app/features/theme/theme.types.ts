import type { AppContour } from '../../core/domain/profile-domain.types';

export type AppTheme = AppContour;

export type ThemeOption = {
  readonly id: AppTheme;
  readonly labelKey: string;
};
