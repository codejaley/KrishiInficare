import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionfeeComponent } from './transactionfee.component';

describe('TransactionfeeComponent', () => {
  let component: TransactionfeeComponent;
  let fixture: ComponentFixture<TransactionfeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionfeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionfeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
