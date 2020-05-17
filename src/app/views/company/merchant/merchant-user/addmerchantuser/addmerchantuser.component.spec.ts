import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmerchantuserComponent } from './addmerchantuser.component';

describe('AddmerchantuserComponent', () => {
  let component: AddmerchantuserComponent;
  let fixture: ComponentFixture<AddmerchantuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmerchantuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmerchantuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
