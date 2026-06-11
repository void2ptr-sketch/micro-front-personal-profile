import { inject, provideAppInitializer } from '@angular/core';

import { ProfileStateService } from './profile-state.service';

export const provideAppState = () =>
  provideAppInitializer(() => {
    inject(ProfileStateService).loadInitialProfile();
  });
