import { CartViewModule } from './cart-view.module';

describe('CartViewModule', () => {
  let cartViewModule: CartViewModule;

  beforeEach(() => {
    cartViewModule = new CartViewModule();
  });

  it('should create an instance', () => {
    expect(cartViewModule).toBeTruthy();
  });
});
