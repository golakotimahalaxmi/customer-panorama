import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentSignalsComponent } from './intent-signals.component';

describe('IntentSignalsComponent', () => {
  let component: IntentSignalsComponent;
  let fixture: ComponentFixture<IntentSignalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntentSignalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
