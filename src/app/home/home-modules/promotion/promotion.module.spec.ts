import { PromotionModule } from './promotion.module';

describe('PromotionModule', () => {
  let promotionModule: PromotionModule;

  beforeEach(() => {
    promotionModule = new PromotionModule();
  });

  it('should create an instance', () => {
    expect(promotionModule).toBeTruthy();
  });
});
