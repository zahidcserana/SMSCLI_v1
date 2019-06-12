import { OrderDetailsModule } from './order-details.module';

describe('OrderDetailsModule', () => {
  let orderDetailsModule: OrderDetailsModule;

  beforeEach(() => {
    orderDetailsModule = new OrderDetailsModule();
  });

  it('should create an instance', () => {
    expect(orderDetailsModule).toBeTruthy();
  });
});
