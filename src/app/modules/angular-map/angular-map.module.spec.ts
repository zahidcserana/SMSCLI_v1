import { AngularMapModule } from './angular-map.module';

describe('AngularMapModule', () => {
  let angularMapModule: AngularMapModule;

  beforeEach(() => {
    angularMapModule = new AngularMapModule();
  });

  it('should create an instance', () => {
    expect(angularMapModule).toBeTruthy();
  });
});
