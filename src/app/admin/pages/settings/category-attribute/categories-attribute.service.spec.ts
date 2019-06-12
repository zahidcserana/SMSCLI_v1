import { TestBed, inject } from '@angular/core/testing';

import { CategoriesAttributeService } from './categories-attribute.service';

describe('CategoriesAttributeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriesAttributeService]
    });
  });

  it('should be created', inject([CategoriesAttributeService], (service: CategoriesAttributeService) => {
    expect(service).toBeTruthy();
  }));
});
