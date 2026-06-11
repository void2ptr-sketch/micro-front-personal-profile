import { inject, provideAppInitializer } from '@angular/core';

import { ProfileStateService } from '../../core/state/profile-state.service';

import { THEME_PLUGIN } from './theme.constants';
import { ThemeService } from './service/theme.service';

export const provideThemeFeature = () =>
  provideAppInitializer(async () => {
    inject(ThemeService).initialize();
    const profileState = inject(ProfileStateService);
    await profileState.loadInitialProfile();
    profileState.registerPlugin(THEME_PLUGIN);
  });
