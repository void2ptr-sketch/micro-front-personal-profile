import type { NavItem } from '../domain/profile-domain.types';

export const DEFAULT_NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', path: 'user-info', labelKey: 'nav.userInfo' },
];
