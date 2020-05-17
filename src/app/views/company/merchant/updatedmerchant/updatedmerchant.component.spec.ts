import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedmerchantComponent } from './updatedmerchant.component';

describe('UpdatedmerchantComponent', () => {
  let component: UpdatedmerchantComponent;
  let fixture: ComponentFixture<UpdatedmerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedmerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedmerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
