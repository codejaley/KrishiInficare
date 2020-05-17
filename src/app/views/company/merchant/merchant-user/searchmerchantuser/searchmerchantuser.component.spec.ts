import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchmerchantuserComponent } from './searchmerchantuser.component';

describe('SearchmerchantuserComponent', () => {
  let component: SearchmerchantuserComponent;
  let fixture: ComponentFixture<SearchmerchantuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchmerchantuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchmerchantuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
