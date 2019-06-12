import { ViewProductModule } from './view-product.module';

describe('ViewProductModule', () => {
  let viewProductModule: ViewProductModule;

  beforeEach(() => {
    viewProductModule = new ViewProductModule();
  });

  it('should create an instance', () => {
    expect(viewProductModule).toBeTruthy();
  });
});
