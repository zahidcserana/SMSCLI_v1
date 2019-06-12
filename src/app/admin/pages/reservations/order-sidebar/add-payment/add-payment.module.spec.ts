import { AddPaymentModule } from './add-payment.module';

describe('AddPaymentModule', () => {
  let addPaymentModule: AddPaymentModule;

  beforeEach(() => {
    addPaymentModule = new AddPaymentModule();
  });

  it('should create an instance', () => {
    expect(addPaymentModule).toBeTruthy();
  });
});
