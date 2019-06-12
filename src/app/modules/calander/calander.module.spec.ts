import { CalanderModule } from './calander.module';

describe('CalanderModule', () => {
  let calanderModule: CalanderModule;

  beforeEach(() => {
    calanderModule = new CalanderModule();
  });

  it('should create an instance', () => {
    expect(calanderModule).toBeTruthy();
  });
});
