import { TestBed } from '@angular/core/testing';

import { InputSanitizerService } from './input-sanitizer.service';

describe('InputSanitizerService', () => {
  let service: InputSanitizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputSanitizerService);
  });

  it('should strip html from text', () => {
    expect(service.sanitizeText('<script>alert(1)</script>hello')).toBe('hello');
  });

  it('should remove control characters from password', () => {
    expect(service.sanitizePassword('pass\u0000word')).toBe('password');
  });

  it('should limit password length', () => {
    expect(service.sanitizePassword('a'.repeat(200), { maxLength: 10 })).toBe('a'.repeat(10));
  });
});
