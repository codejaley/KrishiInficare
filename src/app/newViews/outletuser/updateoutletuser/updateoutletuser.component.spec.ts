import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateoutletuserComponent } from './updateoutletuser.component';

describe('UpdateoutletuserComponent', () => {
  let component: UpdateoutletuserComponent;
  let fixture: ComponentFixture<UpdateoutletuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateoutletuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateoutletuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
