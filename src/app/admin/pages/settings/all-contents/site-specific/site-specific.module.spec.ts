import { SiteSpecificModule } from './site-specific.module';

describe('SiteSpecificModule', () => {
  let siteSpecificModule: SiteSpecificModule;

  beforeEach(() => {
    siteSpecificModule = new SiteSpecificModule();
  });

  it('should create an instance', () => {
    expect(siteSpecificModule).toBeTruthy();
  });
});
