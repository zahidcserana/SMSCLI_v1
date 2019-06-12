import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilteringComponent } from './product-filtering.component';

describe('ProductFilteringComponent', () => {
  let component: ProductFilteringComponent;
  let fixture: ComponentFixture<ProductFilteringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFilteringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
