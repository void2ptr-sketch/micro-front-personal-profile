import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ProfileApiService } from '../api/services/profile-api.service';
import { createInitialProfile } from '../models/profile.models';
import { LocaleService } from '../../features/locale/service/locale.service';

import { ProfileStateService } from './profile-state.service';

describe('ProfileStateService', () => {
  let service: ProfileStateService;

  beforeEach(() => {
    localStorage.clear();
    spyOnProperty(navigator, 'language', 'get').and.returnValue('ru-RU');

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ProfileApiService,
          useValue: {
            getProfile: () => of({ data: createInitialProfile() }),
          },
        },
      ],
    });

    TestBed.inject(LocaleService).initialize();
    service = TestBed.inject(ProfileStateService);
  });

  it('should load initial profile', async () => {
    await service.loadInitialProfile();

    expect(service.status()).toBe('success');
    expect(service.profile()?.userId).toBe('demo-user');
    expect(service.displayName()).toBe('Демо-пользователь');
  });

  it('should register plugin without duplicates', async () => {
    await service.loadInitialProfile();

    const plugin = {
      id: 'security',
      name: 'Безопасность',
      routePath: '/security',
      labelKey: 'nav.security',
    };
    service.registerPlugin(plugin);
    service.registerPlugin(plugin);

    expect(service.plugins()).toHaveSize(1);
    expect(service.plugins()[0].name).toBe('Безопасность');
  });

  it('should apply pending plugins after profile load', async () => {
    const plugin = {
      id: 'security',
      name: 'Безопасность',
      routePath: '/security',
      labelKey: 'nav.security',
    };

    service.registerPlugin(plugin);
    await service.loadInitialProfile();

    expect(service.plugins()).toHaveSize(1);
    expect(service.plugins()[0].id).toBe('security');
  });

  it('should set error state', () => {
    service.setError('Ошибка загрузки');

    expect(service.hasError()).toBeTrue();
    expect(service.error()).toBe('Ошибка загрузки');
  });
});
