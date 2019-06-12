import { ProductWizardModule } from './product-wizard.module';

describe('ProductWizardModule', () => {
  let productWizardModule: ProductWizardModule;

  beforeEach(() => {
    productWizardModule = new ProductWizardModule();
  });

  it('should create an instance', () => {
    expect(productWizardModule).toBeTruthy();
  });
});
