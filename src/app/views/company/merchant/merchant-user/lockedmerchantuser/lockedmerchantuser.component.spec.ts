import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockedmerchantuserComponent } from './lockedmerchantuser.component';

describe('LockedmerchantuserComponent', () => {
  let component: LockedmerchantuserComponent;
  let fixture: ComponentFixture<LockedmerchantuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockedmerchantuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockedmerchantuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
