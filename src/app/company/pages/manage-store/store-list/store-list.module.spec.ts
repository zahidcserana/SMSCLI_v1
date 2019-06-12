import { StoreListModule } from './store-list.module';

describe('StoreListModule', () => {
  let storeListModule: StoreListModule;

  beforeEach(() => {
    storeListModule = new StoreListModule();
  });

  it('should create an instance', () => {
    expect(storeListModule).toBeTruthy();
  });
});
