import { AvailabilityModule } from './availability.module';

describe('AvailabilityModule', () => {
  let availabilityModule: AvailabilityModule;

  beforeEach(() => {
    availabilityModule = new AvailabilityModule();
  });

  it('should create an instance', () => {
    expect(availabilityModule).toBeTruthy();
  });
});
