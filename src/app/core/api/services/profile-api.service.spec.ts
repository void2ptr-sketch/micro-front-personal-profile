import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { APP_ENVIRONMENT } from '../../config/app-environment.token';
import { createInitialProfile } from '../../models/profile.models';

import { ProfileApiService } from './profile-api.service';

describe('ProfileApiService', () => {
  let service: ProfileApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ProfileApiService,
        {
          provide: APP_ENVIRONMENT,
          useValue: {
            apiUrl: 'http://localhost:3000/api',
            useMockApi: false,
          },
        },
      ],
    });

    service = TestBed.inject(ProfileApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch profile', () => {
    const profile = createInitialProfile();

    service.getProfile().subscribe((response) => {
      expect(response.data).toEqual(profile);
    });

    const request = httpMock.expectOne('http://localhost:3000/api/profile');
    expect(request.request.method).toBe('GET');
    request.flush({ data: profile });
  });
});
