import { AddAppModule } from './add-app.module';

describe('AddAppModule', () => {
  let addAppModule: AddAppModule;

  beforeEach(() => {
    addAppModule = new AddAppModule();
  });

  it('should create an instance', () => {
    expect(addAppModule).toBeTruthy();
  });
});
