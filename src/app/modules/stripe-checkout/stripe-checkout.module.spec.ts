import { StripeCheckoutModule } from './stripe-checkout.module';

describe('StripeCheckoutModule', () => {
  let stripeCheckoutModule: StripeCheckoutModule;

  beforeEach(() => {
    stripeCheckoutModule = new StripeCheckoutModule();
  });

  it('should create an instance', () => {
    expect(stripeCheckoutModule).toBeTruthy();
  });
});
