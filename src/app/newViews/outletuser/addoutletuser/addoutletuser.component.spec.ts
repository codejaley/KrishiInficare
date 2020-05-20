import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoutletuserComponent } from './addoutletuser.component';

describe('AddoutletuserComponent', () => {
  let component: AddoutletuserComponent;
  let fixture: ComponentFixture<AddoutletuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddoutletuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddoutletuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
