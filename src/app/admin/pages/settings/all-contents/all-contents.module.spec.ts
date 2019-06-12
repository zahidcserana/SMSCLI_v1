import { AllContentsModule } from './all-contents.module';

describe('AllContentsModule', () => {
  let allContentsModule: AllContentsModule;

  beforeEach(() => {
    allContentsModule = new AllContentsModule();
  });

  it('should create an instance', () => {
    expect(allContentsModule).toBeTruthy();
  });
});
