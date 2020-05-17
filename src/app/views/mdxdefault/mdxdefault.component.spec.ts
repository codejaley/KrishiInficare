import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MDXDefaultComponent } from './mdxdefault.component';

describe('MDXDefaultComponent', () => {
  let component: MDXDefaultComponent;
  let fixture: ComponentFixture<MDXDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MDXDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MDXDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
