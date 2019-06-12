import { SchoolModule } from './school.module';

describe('SchoolModule', () => {
  let schoolModule: SchoolModule;

  beforeEach(() => {
    schoolModule = new SchoolModule();
  });

  it('should create an instance', () => {
    expect(schoolModule).toBeTruthy();
  });
});
