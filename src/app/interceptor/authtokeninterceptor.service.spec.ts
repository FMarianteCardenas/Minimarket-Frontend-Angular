import { TestBed } from '@angular/core/testing';

import { AuthtokeninterceptorService } from './authtokeninterceptor.service';

describe('AuthtokeninterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthtokeninterceptorService = TestBed.get(AuthtokeninterceptorService);
    expect(service).toBeTruthy();
  });
});
