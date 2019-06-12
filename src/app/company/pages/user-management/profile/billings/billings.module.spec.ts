import { BillingsModule } from './billings.module';

describe('BillingsModule', () => {
  let billingsModule: BillingsModule;

  beforeEach(() => {
    billingsModule = new BillingsModule();
  });

  it('should create an instance', () => {
    expect(billingsModule).toBeTruthy();
  });
});
