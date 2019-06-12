import { CardConnectCheckoutModule } from './card-connect-checkout.module';

describe('CardConnectCheckoutModule', () => {
  let cardConnectCheckoutModule: CardConnectCheckoutModule;

  beforeEach(() => {
    cardConnectCheckoutModule = new CardConnectCheckoutModule();
  });

  it('should create an instance', () => {
    expect(cardConnectCheckoutModule).toBeTruthy();
  });
});
