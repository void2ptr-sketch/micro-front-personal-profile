import { EnvironmentProviders, makeEnvironmentProviders, Provider } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TitleStrategy } from '@angular/router';

import { environment } from '../../../environments/environment';
import { AuthTokenService } from '../api/auth/auth-token.service';
import { provideHttpApi } from '../api/provide-http-api';
import { ProfileApiService } from '../api/services/profile-api.service';
import { SecurityApiService } from '../api/services/security-api.service';
import { APP_ENVIRONMENT } from '../config/app-environment.token';
import { I18nTitleStrategy } from '../i18n/i18n-title.strategy';
import { NavigationStateService } from '../state/navigation-state.service';
import { ProfileStateService } from '../state/profile-state.service';
import { provideAppState } from '../state/provide-app-state';
import { provideLocaleFeature } from '../../features/locale/provide-locale-feature';
import { provideSecurityFeature } from '../../features/security/provide-security-feature';
import { SecurityService } from '../../features/security/service/security.service';
import { provideThemeFeature } from '../../features/theme/provide-theme-feature';
import { ThemeService } from '../../features/theme/service/theme.service';
import { LocaleService } from '../../features/locale/service/locale.service';
import { InputSanitizerService } from '../../shared/security/input-sanitizer.service';

const PERSONAL_PROFILE_SERVICES: Provider[] = [
  ProfileStateService,
  LocaleService,
  ThemeService,
  ProfileApiService,
  SecurityApiService,
  AuthTokenService,
  SecurityService,
  InputSanitizerService,
  NavigationStateService,
];

const PERSONAL_PROFILE_FEATURE_PROVIDERS: (Provider | EnvironmentProviders)[] = [
  { provide: APP_ENVIRONMENT, useValue: environment },
  ...PERSONAL_PROFILE_SERVICES,
  provideHttpApi(),
  provideLocaleFeature(),
  provideThemeFeature(),
  provideAppState(),
  provideSecurityFeature(),
];

/** Remote routes in host shell: animations are provided by the shell app. */
export const providePersonalProfileRemote = (): EnvironmentProviders =>
  makeEnvironmentProviders(PERSONAL_PROFILE_FEATURE_PROVIDERS);

export const providePersonalProfileCore = (): EnvironmentProviders =>
  makeEnvironmentProviders([
    provideAnimations(),
    { provide: TitleStrategy, useClass: I18nTitleStrategy },
    ...PERSONAL_PROFILE_FEATURE_PROVIDERS,
  ]);
