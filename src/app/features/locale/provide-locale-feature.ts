import { inject, provideAppInitializer } from '@angular/core';

import { ProfileStateService } from '../../core/state/profile-state.service';

import { LOCALE_PLUGIN } from './locale/locale.constants';
import { LocaleService } from './service/locale.service';

export const provideLocaleFeature = () =>
  provideAppInitializer(async () => {
    inject(LocaleService).initialize();
    const profileState = inject(ProfileStateService);
    await profileState.loadInitialProfile();
    profileState.registerPlugin(LOCALE_PLUGIN);
  });
