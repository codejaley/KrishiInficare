import { TestBed } from '@angular/core/testing';

import { TransactionfeeService } from './transactionfee.service';

describe('TransactionfeeService', () => {
  let service: TransactionfeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionfeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
