import { NewUserTourModule } from './new-user-tour.module';

describe('NewUserTourModule', () => {
  let newUserTourModule: NewUserTourModule;

  beforeEach(() => {
    newUserTourModule = new NewUserTourModule();
  });

  it('should create an instance', () => {
    expect(newUserTourModule).toBeTruthy();
  });
});
