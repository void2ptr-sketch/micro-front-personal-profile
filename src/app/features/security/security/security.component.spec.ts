import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { SecurityComponent } from './security.component';

describe('SecurityComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SecurityComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
