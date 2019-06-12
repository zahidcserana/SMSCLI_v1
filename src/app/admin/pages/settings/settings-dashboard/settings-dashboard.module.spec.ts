import { SettingsDashboardModule } from './settings-dashboard.module';

describe('SettingsDashboardModule', () => {
  let settingsDashboardModule: SettingsDashboardModule;

  beforeEach(() => {
    settingsDashboardModule = new SettingsDashboardModule();
  });

  it('should create an instance', () => {
    expect(settingsDashboardModule).toBeTruthy();
  });
});
