import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SecurityApiService } from '../../../core/api/services/security-api.service';
import { InputSanitizerService } from '../../../shared/security/input-sanitizer.service';
import { LocaleService } from '../../locale/service/locale.service';
import { SecurityService } from './security.service';

describe('SecurityService', () => {
  let service: SecurityService;

  beforeEach(() => {
    localStorage.clear();
    spyOnProperty(navigator, 'language', 'get').and.returnValue('ru-RU');

    TestBed.configureTestingModule({
      providers: [
        LocaleService,
        SecurityService,
        InputSanitizerService,
        {
          provide: SecurityApiService,
          useValue: {
            changePassword: () => of({ data: { changed: true } }),
          },
        },
      ],
    });

    TestBed.inject(LocaleService).initialize();
    service = TestBed.inject(SecurityService);
  });

  it('should change password with valid request', async () => {
    await service.changePassword({
      currentPassword: 'old-password',
      newPassword: 'new-password',
      confirmPassword: 'new-password',
    });

    expect(service.isSuccess()).toBeTrue();
    expect(service.successMessage()).toBe('Пароль успешно изменён');
  });

  it('should reject mismatched passwords', async () => {
    await service.changePassword({
      currentPassword: 'old-password',
      newPassword: 'new-password',
      confirmPassword: 'other-password',
    });

    expect(service.error()).toBe('Пароли не совпадают');
  });

  it('should reject short password', async () => {
    await service.changePassword({
      currentPassword: 'old-password',
      newPassword: 'short',
      confirmPassword: 'short',
    });

    expect(service.error()).toContain('8 символов');
  });
});
