import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoutletComponent } from './addoutlet.component';

describe('AddoutletComponent', () => {
  let component: AddoutletComponent;
  let fixture: ComponentFixture<AddoutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddoutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddoutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
