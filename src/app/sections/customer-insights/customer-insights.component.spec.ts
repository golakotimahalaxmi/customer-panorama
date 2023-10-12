import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInsightsComponent } from './customer-insights.component';

describe('CustomerInsightsComponent', () => {
  let component: CustomerInsightsComponent;
  let fixture: ComponentFixture<CustomerInsightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerInsightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
