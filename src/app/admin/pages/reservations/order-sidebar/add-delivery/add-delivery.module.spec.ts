import { AddDeliveryModule } from './add-delivery.module';

describe('AddDeliveryModule', () => {
  let addDeliveryModule: AddDeliveryModule;

  beforeEach(() => {
    addDeliveryModule = new AddDeliveryModule();
  });

  it('should create an instance', () => {
    expect(addDeliveryModule).toBeTruthy();
  });
});
