import { Injectable, computed, inject } from '@angular/core';

import { DEFAULT_NAV_ITEMS } from '../config/nav-items';
import type { NavItem } from '../domain/profile-domain.types';

import { ProfileStateService } from './profile-state.service';

@Injectable({ providedIn: 'root' })
export class NavigationStateService {
  private readonly profileState = inject(ProfileStateService);

  readonly navItems = computed((): readonly NavItem[] => {
    const pluginItems: NavItem[] = this.profileState.plugins().map((plugin) => ({
      label: plugin.name,
      path: plugin.routePath,
      labelKey: plugin.labelKey,
    }));

    return [...DEFAULT_NAV_ITEMS, ...pluginItems];
  });
}
