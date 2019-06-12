import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextTypeComponent } from './text-type.component';

describe('TextTypeComponent', () => {
  let component: TextTypeComponent;
  let fixture: ComponentFixture<TextTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
