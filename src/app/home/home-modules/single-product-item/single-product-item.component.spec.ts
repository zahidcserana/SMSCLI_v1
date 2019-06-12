import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProductItemComponent } from './single-product-item.component';

describe('SingleProductItemComponent', () => {
  let component: SingleProductItemComponent;
  let fixture: ComponentFixture<SingleProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleProductItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
