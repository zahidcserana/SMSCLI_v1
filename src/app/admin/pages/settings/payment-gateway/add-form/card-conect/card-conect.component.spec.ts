import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardConectComponent } from './card-conect.component';

describe('CardConectComponent', () => {
  let component: CardConectComponent;
  let fixture: ComponentFixture<CardConectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardConectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardConectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
