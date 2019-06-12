import { StoreLogoModule } from './store-logo.module';

describe('StoreLogoModule', () => {
  let storeLogoModule: StoreLogoModule;

  beforeEach(() => {
    storeLogoModule = new StoreLogoModule();
  });

  it('should create an instance', () => {
    expect(storeLogoModule).toBeTruthy();
  });
});
