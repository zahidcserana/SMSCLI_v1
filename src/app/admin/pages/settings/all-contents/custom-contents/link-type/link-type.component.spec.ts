import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkTypeComponent } from './link-type.component';

describe('LinkTypeComponent', () => {
  let component: LinkTypeComponent;
  let fixture: ComponentFixture<LinkTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
