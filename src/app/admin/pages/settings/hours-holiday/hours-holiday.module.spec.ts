import { HoursHolidayModule } from './hours-holiday.module';

describe('HoursHolidayModule', () => {
  let hoursHolidayModule: HoursHolidayModule;

  beforeEach(() => {
    hoursHolidayModule = new HoursHolidayModule();
  });

  it('should create an instance', () => {
    expect(hoursHolidayModule).toBeTruthy();
  });
});
