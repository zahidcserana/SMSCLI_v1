import { SalesReportModule } from './sales-report.module';

describe('SalesReportModule', () => {
  let salesReportModule: SalesReportModule;

  beforeEach(() => {
    salesReportModule = new SalesReportModule();
  });

  it('should create an instance', () => {
    expect(salesReportModule).toBeTruthy();
  });
});
