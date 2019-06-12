import { StoreDetailsModule } from './store-details.module';

describe('StoreDetailsModule', () => {
  let storeDetailsModule: StoreDetailsModule;

  beforeEach(() => {
    storeDetailsModule = new StoreDetailsModule();
  });

  it('should create an instance', () => {
    expect(storeDetailsModule).toBeTruthy();
  });
});
