import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { SecurityApiService } from '../../../core/api/services/security-api.service';
import { LocaleService } from '../../locale/service/locale.service';
import { SecurityService } from '../service/security.service';

import { SecurityComponent } from './security.component';

describe('SecurityComponent', () => {
  beforeEach(async () => {
    localStorage.clear();
    spyOnProperty(navigator, 'language', 'get').and.returnValue('ru-RU');

    await TestBed.configureTestingModule({
      imports: [SecurityComponent],
      providers: [
        provideNoopAnimations(),
        LocaleService,
        SecurityService,
        {
          provide: SecurityApiService,
          useValue: {
            changePassword: () => of({ data: { changed: true } }),
          },
        },
      ],
    }).compileComponents();

    TestBed.inject(LocaleService).initialize();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SecurityComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
