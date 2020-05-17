import { TestBed } from '@angular/core/testing';

import { MerchantuserService } from './merchantuser.service';

describe('MerchantuserService', () => {
  let service: MerchantuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchantuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
