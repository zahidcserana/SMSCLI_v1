import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsPaymentComponent } from './subs-payment.component';

describe('SubsPaymentComponent', () => {
  let component: SubsPaymentComponent;
  let fixture: ComponentFixture<SubsPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
