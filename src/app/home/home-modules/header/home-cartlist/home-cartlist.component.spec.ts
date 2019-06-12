import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCartlistComponent } from './home-cartlist.component';

describe('HomeCartlistComponent', () => {
  let component: HomeCartlistComponent;
  let fixture: ComponentFixture<HomeCartlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCartlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCartlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
