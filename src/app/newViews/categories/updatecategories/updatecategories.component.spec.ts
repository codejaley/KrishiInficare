import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecategoriesComponent } from './updatecategories.component';

describe('UpdatecategoriesComponent', () => {
  let component: UpdatecategoriesComponent;
  let fixture: ComponentFixture<UpdatecategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatecategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
