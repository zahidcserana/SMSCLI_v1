import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalCalenderComponent } from './rental-calender.component';

describe('RentalCalenderComponent', () => {
  let component: RentalCalenderComponent;
  let fixture: ComponentFixture<RentalCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
