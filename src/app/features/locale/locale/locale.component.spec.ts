import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { LocaleService } from '../service/locale.service';

import { LocaleComponent } from './locale.component';

describe('LocaleComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocaleComponent],
      providers: [provideNoopAnimations(), LocaleService],
    }).compileComponents();

    TestBed.inject(LocaleService).initialize();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LocaleComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
