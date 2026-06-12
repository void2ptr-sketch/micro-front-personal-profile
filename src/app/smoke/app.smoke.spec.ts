import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AppComponent } from '../app.component';
import { MainLayoutComponent } from '../core/layout/main-layout/main-layout.component';
import { ProfileStateService } from '../core/state/profile-state.service';
import { LOCALE_PLUGIN } from '../features/locale/locale/locale.constants';
import { LocaleService } from '../features/locale/service/locale.service';
import { SECURITY_PLUGIN } from '../features/security/security.constants';
import { THEME_PLUGIN } from '../features/theme/theme.constants';
import { ThemeService } from '../features/theme/service/theme.service';

import { smokeTestProviders } from './smoke-test.providers';

describe('App smoke scenarios', () => {
  beforeEach(async () => {
    localStorage.clear();
    sessionStorage.clear();
    spyOnProperty(navigator, 'language', 'get').and.returnValue('ru-RU');

    await TestBed.configureTestingModule({
      imports: [AppComponent, MainLayoutComponent],
      providers: smokeTestProviders,
    }).compileComponents();

    TestBed.inject(LocaleService).initialize();
    TestBed.inject(ThemeService).initialize();
    const profileState = TestBed.inject(ProfileStateService);
    await profileState.loadInitialProfile();
    profileState.registerPlugin(SECURITY_PLUGIN);
    profileState.registerPlugin(LOCALE_PLUGIN);
    profileState.registerPlugin(THEME_PLUGIN);
  });

  it('should bootstrap application shell', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('router-outlet')).toBeTruthy();
  });

  it('should render main navigation items', () => {
    const fixture = TestBed.createComponent(MainLayoutComponent);
    fixture.detectChanges();

    const links = fixture.nativeElement.querySelectorAll('a.navigation__link');
    expect(links.length).toBe(4);
  });

  it('should navigate to user-info route', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/user-info');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.url).toBe('/user-info');
    expect(fixture.nativeElement.textContent).toContain('Демо-пользователь');
  });

  it('should navigate to security route', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/security');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.url).toBe('/security');
    expect(fixture.nativeElement.textContent).toContain('Безопасность');
  });

  it('should navigate to locale route', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/locale');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.url).toBe('/locale');
    expect(fixture.nativeElement.textContent).toContain('Язык');
  });

  it('should navigate to theme route', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/theme');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.url).toBe('/theme');
    expect(fixture.nativeElement.textContent).toContain('Оформление');
  });
});
