import { TestBed } from '@angular/core/testing';

import { MinimarketService } from './minimarket.service';

describe('MinimarketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MinimarketService = TestBed.get(MinimarketService);
    expect(service).toBeTruthy();
  });
});
