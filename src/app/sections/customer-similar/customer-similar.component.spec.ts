import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSimilarComponent } from './customer-similar.component';

describe('CustomerSimilarComponent', () => {
  let component: CustomerSimilarComponent;
  let fixture: ComponentFixture<CustomerSimilarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSimilarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSimilarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
