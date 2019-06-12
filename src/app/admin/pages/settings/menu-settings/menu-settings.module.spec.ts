import { MenuSettingsModule } from './menu-settings.module';

describe('MenuSettingsModule', () => {
  let menuSettingsModule: MenuSettingsModule;

  beforeEach(() => {
    menuSettingsModule = new MenuSettingsModule();
  });

  it('should create an instance', () => {
    expect(menuSettingsModule).toBeTruthy();
  });
});
