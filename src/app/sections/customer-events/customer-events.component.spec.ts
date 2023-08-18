import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEventsComponent } from './customer-events.component';

describe('CustomerEventsComponent', () => {
  let component: CustomerEventsComponent;
  let fixture: ComponentFixture<CustomerEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
