import { PaypalCheckoutModule } from './paypal-checkout.module';

describe('PaypalCheckoutModule', () => {
  let paypalCheckoutModule: PaypalCheckoutModule;

  beforeEach(() => {
    paypalCheckoutModule = new PaypalCheckoutModule();
  });

  it('should create an instance', () => {
    expect(paypalCheckoutModule).toBeTruthy();
  });
});
