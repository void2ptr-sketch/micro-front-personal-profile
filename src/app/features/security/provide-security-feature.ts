import { inject, provideAppInitializer } from '@angular/core';

import { ProfileStateService } from '../../core/state/profile-state.service';

import { SECURITY_PLUGIN } from './security.constants';

export const provideSecurityFeature = () =>
  provideAppInitializer(async () => {
    const profileState = inject(ProfileStateService);
    await profileState.loadInitialProfile();
    profileState.registerPlugin(SECURITY_PLUGIN);
  });
