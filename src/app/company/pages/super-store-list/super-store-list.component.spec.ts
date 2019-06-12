import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperStoreListComponent } from './super-store-list.component';

describe('SuperStoreListComponent', () => {
  let component: SuperStoreListComponent;
  let fixture: ComponentFixture<SuperStoreListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperStoreListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperStoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
