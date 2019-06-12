import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardConnectCheckoutComponent } from './card-connect-checkout.component';

describe('CardConnectCheckoutComponent', () => {
  let component: CardConnectCheckoutComponent;
  let fixture: ComponentFixture<CardConnectCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardConnectCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardConnectCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
