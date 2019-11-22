import { TestBed } from '@angular/core/testing';

import { FooterUpdateService } from './footer-update.service';

describe('FooterUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FooterUpdateService = TestBed.get(FooterUpdateService);
    expect(service).toBeTruthy();
  });
});
