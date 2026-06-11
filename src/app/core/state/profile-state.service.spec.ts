import { TestBed } from '@angular/core/testing';

import { ProfileStateService } from './profile-state.service';

describe('ProfileStateService', () => {
  let service: ProfileStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileStateService);
  });

  it('should load initial profile', () => {
    service.loadInitialProfile();

    expect(service.status()).toBe('success');
    expect(service.profile()?.userId).toBe('demo-user');
    expect(service.displayName()).toBe('Демо-пользователь');
  });

  it('should register plugin without duplicates', () => {
    service.loadInitialProfile();

    const plugin = { id: 'security', name: 'Безопасность', routePath: '/security' };
    service.registerPlugin(plugin);
    service.registerPlugin(plugin);

    expect(service.plugins()).toHaveSize(1);
    expect(service.plugins()[0].name).toBe('Безопасность');
  });

  it('should set error state', () => {
    service.setError('Ошибка загрузки');

    expect(service.hasError()).toBeTrue();
    expect(service.error()).toBe('Ошибка загрузки');
  });
});
