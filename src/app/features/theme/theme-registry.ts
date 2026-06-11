import type { AppTheme, ThemeOption } from './theme.types';

export const THEME_STORAGE_KEY = 'personal-profile.theme';

export const SUPPORTED_THEMES: readonly AppTheme[] = [
  'local',
  'dev',
  'test',
  'lt',
  'preprod',
  'prod',
];

export const THEME_OPTIONS: readonly ThemeOption[] = [
  { id: 'local', labelKey: 'theme.option.local' },
  { id: 'dev', labelKey: 'theme.option.dev' },
  { id: 'test', labelKey: 'theme.option.test' },
  { id: 'lt', labelKey: 'theme.option.lt' },
  { id: 'preprod', labelKey: 'theme.option.preprod' },
  { id: 'prod', labelKey: 'theme.option.prod' },
];

export const isAppTheme = (value: string): value is AppTheme =>
  SUPPORTED_THEMES.includes(value as AppTheme);
