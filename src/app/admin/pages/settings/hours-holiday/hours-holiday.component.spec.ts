import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursHolidayComponent } from './hours-holiday.component';

describe('HoursHolidayComponent', () => {
  let component: HoursHolidayComponent;
  let fixture: ComponentFixture<HoursHolidayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoursHolidayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoursHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
