import { AddRegisterModule } from './add-register.module';

describe('AddRegisterModule', () => {
  let addRegisterModule: AddRegisterModule;

  beforeEach(() => {
    addRegisterModule = new AddRegisterModule();
  });

  it('should create an instance', () => {
    expect(addRegisterModule).toBeTruthy();
  });
});
