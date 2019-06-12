import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoltTerminalComponent } from './bolt-terminal.component';

describe('BoltTerminalComponent', () => {
  let component: BoltTerminalComponent;
  let fixture: ComponentFixture<BoltTerminalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoltTerminalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoltTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
