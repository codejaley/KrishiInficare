import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateoutletComponent } from './updateoutlet.component';

describe('UpdateoutletComponent', () => {
  let component: UpdateoutletComponent;
  let fixture: ComponentFixture<UpdateoutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateoutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateoutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
