import { CustomPageModule } from './custom-page.module';

describe('CustomPageModule', () => {
  let customPageModule: CustomPageModule;

  beforeEach(() => {
    customPageModule = new CustomPageModule();
  });

  it('should create an instance', () => {
    expect(customPageModule).toBeTruthy();
  });
});
