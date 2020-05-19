import { TestBed } from '@angular/core/testing';

import { OutletuserService } from './outletuser.service';

describe('OutletuserService', () => {
  let service: OutletuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutletuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
