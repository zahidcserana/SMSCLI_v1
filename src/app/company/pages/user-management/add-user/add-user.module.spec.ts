import { AddUserModule } from './add-user.module';

describe('AddUserModule', () => {
  let addUserModule: AddUserModule;

  beforeEach(() => {
    addUserModule = new AddUserModule();
  });

  it('should create an instance', () => {
    expect(addUserModule).toBeTruthy();
  });
});
