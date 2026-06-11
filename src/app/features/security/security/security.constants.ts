import type { ProfilePlugin } from '../../../core/domain/profile-domain.types';

export const SECURITY_PLUGIN: ProfilePlugin = {
  id: 'security',
  name: 'Безопасность',
  routePath: '/security',
  labelKey: 'nav.security',
};

export const MIN_PASSWORD_LENGTH = 8;
