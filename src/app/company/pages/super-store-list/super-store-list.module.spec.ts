import { SuperStoreListModule } from './super-store-list.module';

describe('SuperStoreListModule', () => {
  let superStoreListModule: SuperStoreListModule;

  beforeEach(() => {
    superStoreListModule = new SuperStoreListModule();
  });

  it('should create an instance', () => {
    expect(superStoreListModule).toBeTruthy();
  });
});
