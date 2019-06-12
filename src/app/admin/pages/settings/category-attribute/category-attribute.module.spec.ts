import { CategoryAttributeModule } from './category-attribute.module';

describe('CategoryAttributeModule', () => {
  let categoryAttributeModule: CategoryAttributeModule;

  beforeEach(() => {
    categoryAttributeModule = new CategoryAttributeModule();
  });

  it('should create an instance', () => {
    expect(categoryAttributeModule).toBeTruthy();
  });
});
