import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsFormComponent } from './contents-form.component';

describe('ContentsFormComponent', () => {
  let component: ContentsFormComponent;
  let fixture: ComponentFixture<ContentsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
