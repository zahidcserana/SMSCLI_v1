import { ReportDashboardModule } from './report-dashboard.module';

describe('ReportDashboardModule', () => {
  let reportDashboardModule: ReportDashboardModule;

  beforeEach(() => {
    reportDashboardModule = new ReportDashboardModule();
  });

  it('should create an instance', () => {
    expect(reportDashboardModule).toBeTruthy();
  });
});
