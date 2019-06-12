import { RegisterDashboardModule } from './register-dashboard.module';

describe('RegisterDashboardModule', () => {
  let registerDashboardModule: RegisterDashboardModule;

  beforeEach(() => {
    registerDashboardModule = new RegisterDashboardModule();
  });

  it('should create an instance', () => {
    expect(registerDashboardModule).toBeTruthy();
  });
});
