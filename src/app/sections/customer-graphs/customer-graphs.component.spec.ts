import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGraphsComponent } from './customer-graphs.component';

describe('CustomerGraphsComponent', () => {
  let component: CustomerGraphsComponent;
  let fixture: ComponentFixture<CustomerGraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerGraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
