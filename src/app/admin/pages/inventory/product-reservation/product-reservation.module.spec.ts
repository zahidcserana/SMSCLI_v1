import { ProductReservationModule } from './product-reservation.module';

describe('ProductReservationModule', () => {
  let productReservationModule: ProductReservationModule;

  beforeEach(() => {
    productReservationModule = new ProductReservationModule();
  });

  it('should create an instance', () => {
    expect(productReservationModule).toBeTruthy();
  });
});
