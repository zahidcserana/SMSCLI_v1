import { StoreManagementModule } from './store-management.module';

describe('StoreManagementModule', () => {
  let storeManagementModule: StoreManagementModule;

  beforeEach(() => {
    storeManagementModule = new StoreManagementModule();
  });

  it('should create an instance', () => {
    expect(storeManagementModule).toBeTruthy();
  });
});
