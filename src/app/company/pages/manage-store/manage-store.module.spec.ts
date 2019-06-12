import { ManageStoreModule } from './manage-store.module';

describe('ManageStoreModule', () => {
  let manageStoreModule: ManageStoreModule;

  beforeEach(() => {
    manageStoreModule = new ManageStoreModule();
  });

  it('should create an instance', () => {
    expect(manageStoreModule).toBeTruthy();
  });
});
