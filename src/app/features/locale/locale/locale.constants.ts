import type { ProfilePlugin } from '../../../core/domain/profile-domain.types';

export const LOCALE_PLUGIN: ProfilePlugin = {
  id: 'locale',
  name: 'Язык',
  routePath: '/locale',
  labelKey: 'nav.locale',
};
