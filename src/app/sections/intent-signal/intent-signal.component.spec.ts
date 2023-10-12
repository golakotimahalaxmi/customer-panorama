import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentSignalComponent } from './intent-signal.component';

describe('IntentSignalComponent', () => {
  let component: IntentSignalComponent;
  let fixture: ComponentFixture<IntentSignalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntentSignalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
