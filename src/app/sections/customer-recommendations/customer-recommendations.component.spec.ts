import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRecommendationsComponent } from './customer-recommendations.component';

describe('CustomerRecommendationsComponent', () => {
  let component: CustomerRecommendationsComponent;
  let fixture: ComponentFixture<CustomerRecommendationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRecommendationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
