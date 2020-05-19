import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletuserComponent } from './outletuser.component';

describe('OutletuserComponent', () => {
  let component: OutletuserComponent;
  let fixture: ComponentFixture<OutletuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutletuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
