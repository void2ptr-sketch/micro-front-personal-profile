import { TestBed } from '@angular/core/testing';

import { AuthTokenService } from './auth-token.service';

describe('AuthTokenService', () => {
  let service: AuthTokenService;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthTokenService);
  });

  it('should store and read token', () => {
    service.setToken('test-token');

    expect(service.token()).toBe('test-token');
  });

  it('should clear token', () => {
    service.setToken('test-token');
    service.clearToken();

    expect(service.token()).toBeNull();
  });
});
