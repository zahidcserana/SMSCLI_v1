import { SingleProductItemModule } from './single-product-item.module';

describe('SingleProductItemModule', () => {
  let singleProductItemModule: SingleProductItemModule;

  beforeEach(() => {
    singleProductItemModule = new SingleProductItemModule();
  });

  it('should create an instance', () => {
    expect(singleProductItemModule).toBeTruthy();
  });
});
