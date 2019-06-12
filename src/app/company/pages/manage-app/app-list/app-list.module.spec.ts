import { AppListModule } from './app-list.module';

describe('AppListModule', () => {
  let appListModule: AppListModule;

  beforeEach(() => {
    appListModule = new AppListModule();
  });

  it('should create an instance', () => {
    expect(appListModule).toBeTruthy();
  });
});
