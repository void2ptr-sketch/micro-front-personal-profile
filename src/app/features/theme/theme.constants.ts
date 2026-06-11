import type { ProfilePlugin } from '../../core/domain/profile-domain.types';

export const THEME_PLUGIN: ProfilePlugin = {
  id: 'theme',
  name: 'Оформление',
  routePath: '/theme',
  labelKey: 'nav.theme',
};
