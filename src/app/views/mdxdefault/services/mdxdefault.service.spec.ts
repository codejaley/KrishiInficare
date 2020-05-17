import { TestBed } from '@angular/core/testing';

import { MDXDefaultService } from './mdxdefault.service';

describe('MDXDefaultService', () => {
  let service: MDXDefaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MDXDefaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
