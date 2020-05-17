import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatemerchantuserComponent } from './updatemerchantuser.component';

describe('UpdatemerchantuserComponent', () => {
  let component: UpdatemerchantuserComponent;
  let fixture: ComponentFixture<UpdatemerchantuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatemerchantuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatemerchantuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
