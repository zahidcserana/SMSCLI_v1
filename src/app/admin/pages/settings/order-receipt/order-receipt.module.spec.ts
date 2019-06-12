import { OrderReceiptModule } from './order-receipt.module';

describe('OrderReceiptModule', () => {
  let orderReceiptModule: OrderReceiptModule;

  beforeEach(() => {
    orderReceiptModule = new OrderReceiptModule();
  });

  it('should create an instance', () => {
    expect(orderReceiptModule).toBeTruthy();
  });
});
