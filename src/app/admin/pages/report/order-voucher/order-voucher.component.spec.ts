import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderVoucherComponent } from './order-voucher.component';

describe('OrderVoucherComponent', () => {
  let component: OrderVoucherComponent;
  let fixture: ComponentFixture<OrderVoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderVoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
