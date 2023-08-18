import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerIdentityComponent } from './customer-identity.component';

describe('CustomerIdentityComponent', () => {
  let component: CustomerIdentityComponent;
  let fixture: ComponentFixture<CustomerIdentityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerIdentityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
