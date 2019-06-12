import { InventoryDashboardModule } from './inventory-dashboard.module';

describe('InventoryDashboardModule', () => {
  let inventoryDashboardModule: InventoryDashboardModule;

  beforeEach(() => {
    inventoryDashboardModule = new InventoryDashboardModule();
  });

  it('should create an instance', () => {
    expect(inventoryDashboardModule).toBeTruthy();
  });
});
