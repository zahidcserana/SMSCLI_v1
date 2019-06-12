import { RentalCalenderModule } from './rental-calender.module';

describe('RentalCalenderModule', () => {
  let rentalCalenderModule: RentalCalenderModule;

  beforeEach(() => {
    rentalCalenderModule = new RentalCalenderModule();
  });

  it('should create an instance', () => {
    expect(rentalCalenderModule).toBeTruthy();
  });
});
