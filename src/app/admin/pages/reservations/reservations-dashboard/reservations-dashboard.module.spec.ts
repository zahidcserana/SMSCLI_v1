import { ReservationsDashboardModule } from './reservations-dashboard.module';

describe('ReservationsDashboardModule', () => {
  let reservationsDashboardModule: ReservationsDashboardModule;

  beforeEach(() => {
    reservationsDashboardModule = new ReservationsDashboardModule();
  });

  it('should create an instance', () => {
    expect(reservationsDashboardModule).toBeTruthy();
  });
});
