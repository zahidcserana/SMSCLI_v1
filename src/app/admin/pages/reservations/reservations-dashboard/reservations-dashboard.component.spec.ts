import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsDashboardComponent } from './reservations-dashboard.component';

describe('ReservationsDashboardComponent', () => {
  let component: ReservationsDashboardComponent;
  let fixture: ComponentFixture<ReservationsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
