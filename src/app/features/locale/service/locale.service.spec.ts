import { TestBed } from '@angular/core/testing';

import { LocaleService } from './locale.service';

describe('LocaleService', () => {
  let service: LocaleService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocaleService);
  });

  it('should auto-detect english locale', () => {
    spyOnProperty(navigator, 'language', 'get').and.returnValue('en-US');
    service.initialize();

    expect(service.locale()).toBe('en');
    expect(service.translate('nav.home')).toBe('Home');
  });

  it('should initialize with russian for unknown browser locale', () => {
    spyOnProperty(navigator, 'language', 'get').and.returnValue('de-DE');
    service.initialize();

    expect(service.locale()).toBe('ru');
    expect(service.translate('nav.home')).toBe('Главная');
  });

  it('should auto-detect chinese locale', () => {
    spyOnProperty(navigator, 'language', 'get').and.returnValue('zh-CN');
    service.initialize();

    expect(service.locale()).toBe('zh');
    expect(service.translate('nav.home')).toBe('首页');
  });

  it('should switch locale manually', () => {
    service.initialize();
    service.setLocale('zh');

    expect(service.locale()).toBe('zh');
    expect(localStorage.getItem('personal-profile.locale')).toBe('zh');
  });
});
