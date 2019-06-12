import { OrderSidebarModule } from './order-sidebar.module';

describe('OrderSidebarModule', () => {
  let orderSidebarModule: OrderSidebarModule;

  beforeEach(() => {
    orderSidebarModule = new OrderSidebarModule();
  });

  it('should create an instance', () => {
    expect(orderSidebarModule).toBeTruthy();
  });
});
