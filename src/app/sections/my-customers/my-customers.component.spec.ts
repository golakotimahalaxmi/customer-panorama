import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCustomersComponent } from './my-customers.component';
import { CustomerService } from 'src/app/services/customerService';

describe('MyCustomersComponent', () => {
  let component: MyCustomersComponent;
  let fixture: ComponentFixture<MyCustomersComponent>;
  let service: CustomerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCustomersComponent ],
      imports: []
    })
    .compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should', async(() => {
    spyOn(component, 'selectedCustomer');
  
    let button = fixture.debugElement.nativeElement.querySelector('activeCustomer');
    button.click();
  
    fixture.whenStable().then(() => {
      expect(component.selectedCustomer).toHaveBeenCalled();
    });
  }));

  beforeEach(() => {
    
  });
});
