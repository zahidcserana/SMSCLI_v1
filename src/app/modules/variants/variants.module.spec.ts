import { VariantsModule } from './variants.module';

describe('VariantsModule', () => {
  let variantsModule: VariantsModule;

  beforeEach(() => {
    variantsModule = new VariantsModule();
  });

  it('should create an instance', () => {
    expect(variantsModule).toBeTruthy();
  });
});
