import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllContentsComponent } from './all-contents.component';

describe('AllContentsComponent', () => {
  let component: AllContentsComponent;
  let fixture: ComponentFixture<AllContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
