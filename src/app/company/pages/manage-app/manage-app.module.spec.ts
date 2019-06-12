import { ManageAppModule } from './manage-app.module';

describe('ManageAppModule', () => {
  let manageAppModule: ManageAppModule;

  beforeEach(() => {
    manageAppModule = new ManageAppModule();
  });

  it('should create an instance', () => {
    expect(manageAppModule).toBeTruthy();
  });
});
