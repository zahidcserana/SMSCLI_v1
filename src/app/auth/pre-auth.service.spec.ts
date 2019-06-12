import { TestBed, inject } from '@angular/core/testing';

import { PreAuthService } from './pre-auth.service';

describe('PreAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreAuthService]
    });
  });

  it('should be created', inject([PreAuthService], (service: PreAuthService) => {
    expect(service).toBeTruthy();
  }));
});
