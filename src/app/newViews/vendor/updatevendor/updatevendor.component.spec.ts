import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatevendorComponent } from './updatevendor.component';

describe('UpdatevendorComponent', () => {
  let component: UpdatevendorComponent;
  let fixture: ComponentFixture<UpdatevendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatevendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatevendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
