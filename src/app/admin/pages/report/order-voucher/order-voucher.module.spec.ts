import { OrderVoucherModule } from './order-voucher.module';

describe('OrderVoucherModule', () => {
  let orderVoucherModule: OrderVoucherModule;

  beforeEach(() => {
    orderVoucherModule = new OrderVoucherModule();
  });

  it('should create an instance', () => {
    expect(orderVoucherModule).toBeTruthy();
  });
});
