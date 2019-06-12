import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSpecificComponent } from './site-specific.component';

describe('SiteSpecificComponent', () => {
  let component: SiteSpecificComponent;
  let fixture: ComponentFixture<SiteSpecificComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteSpecificComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
