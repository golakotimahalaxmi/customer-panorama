import { Component, OnInit, ViewEncapsulation, HostListener, ElementRef } from '@angular/core';
import { ModalService } from '../_modal';
import { MycustomersDetails, Customercontacts } from 'src/app/classesList/customer';
import { CustomerService } from 'src/app/services/customerService';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DashboardService } from 'src/app/services/dashboardService';



@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TopNavigationComponent implements OnInit {

  emptyInputvalue: boolean;
  showSearchBox: boolean;
  customersList: Searchcustomers[] = [];
  headingsObject: any = {};
  customerCode: number;
  selectedName: string;
  customerForm: FormGroup;
  hideShowautocomplete = [];
  customerGroupOptions: Observable<Searchcustomers[]>;
  storeAllcustomers: MycustomersDetails[] = [];
  storeAllcontacts: Customercontacts[] = [];
  changeLayoutofAutocomplete: boolean;
  selectedGroup: string;
  currentCustomercode: string = '';





  constructor(private dashboardSevice: DashboardService, private modalService: ModalService, private service: CustomerService, private fb: FormBuilder, private router: Router, private dialog: MatDialog, private eRef: ElementRef, private activatedRoute: ActivatedRoute) {
    this.customerForm = this.fb.group({
      customerInformation: '',
    });
    this.getCustomersData();
    this.onChanges();
  }


  // method for getAllHeadings
  getAllHedings() {
    this.dashboardSevice.getAllheadings().subscribe(headings => {
      if (headings != undefined && headings != null) {
        this.headingsObject = headings;
      }
    });
  }

  // method for hostlistner to hide the auto complete when i click outside
  @HostListener('document:click', ['$event'])
  clickout(event: { target: any; }) {
    let myElements = document.querySelectorAll(".cdk-overlay-container");
    for (let i = 0; i < myElements.length; i++) {
      if (myElements[i].classList.contains('show-data') === true) {
        myElements[i].classList.remove('show-data');
      }
      myElements[i].classList.add('hide-data');
      this.changeLayoutofAutocomplete = false;
    }
  }

  ngOnInit() {
    this.changeLayoutofAutocomplete = false;
    this.showSearchBox = false;
    this.emptyInputvalue = false;
    if (this.dashboardSevice.storeAllheadings === undefined || this.dashboardSevice.storeAllheadings === null) {
      this.getAllHedings();
    } else {
      this.headingsObject = this.dashboardSevice.storeAllheadings;
    }
  }

  // method for checking the form can changing are not
  onChanges() {
    this.customerGroupOptions = this.customerForm.get('customerInformation')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }

  _filterGroup(value: string): Searchcustomers[] {
    this.restoreAllValues();
    let customerName: string;
    this.activatedRoute.paramMap.subscribe(pharammap => {
      this.currentCustomercode = pharammap.get('id');
      if (this.currentCustomercode != null) {
        this.storeAllcustomers.map(customer => {
          if (customer.CustomerCode === parseInt(this.currentCustomercode)) {
            customerName = customer.customer_name;
          }
        })
      }
    })
    this.customersList.map((name, index) => {
      name.names.map((value, index) => {
        if (value === customerName) {
          name.names.splice(index, 1);
        }
      });
    })

    if (value) {
      return this.customersList
        .map(group => ({ letter: group.letter, names: _filter(group.names, value) }))
        .filter(group => group.names.length > 0);
    }

    return this.customersList;
  }

  restoreAllValues() {
    this.customersList.length = 0;
    let customerNames = [];
    this.storeAllcustomers.map(cust => {
      customerNames.push(cust.customer_name);
    });
    let obj: Searchcustomers = { letter: 'ACCOUNTS', names: customerNames };
    this.customersList.push(obj);

    this.restoreContacts();
  }

  restoreContacts() {
    let array = []
    this.storeAllcontacts.forEach(cont => {
      let contactPersonName
      if(cont.ContactActualTitle != '') {
        contactPersonName = cont.contact_name + ' ' + '(' + cont.ContactActualTitle + '), ' + cont.CustomerDescription;
      } else {
        contactPersonName = cont.contact_name + ', '+ cont.CustomerDescription;
      }
     array.push(contactPersonName);
    });
    let obj: Searchcustomers = { letter: 'CONTACTS', names: array };
    this.customersList.push(obj);
  }

  // functionality for escape
  onKeyEscape(event: any) {
    this.customerForm.get('customerInformation').setValue('');
    this.checkInputvaluelength('');
  }


  // method for fecthing customersListData from services
  getCustomersData() {
    let customerNames = [];
    this.service.getMycustomersList().subscribe(customer => {
      customer.forEach(customerVal => {
        let changeName = customerVal.customer_name.replace(/ *\([^)]*\) */g, "");
        customerVal.customer_name = changeName;
        customerNames.push(customerVal.customer_name);
        this.storeAllcustomers.push(customerVal);
      });
      let obj: Searchcustomers = { letter: 'ACCOUNTS', names: customerNames };
      this.customersList.push(obj);
      this.getAllcustomerContantLIst();
    });
  }
  // method for calling get all contacts list
  getAllcustomerContantLIst() {
    let array = []
    this.service.getAllcustomercontacts().subscribe(contacts => {
      contacts.forEach(cont => {
        let changeName = cont.CustomerDescription.replace(/ *\([^)]*\) */g, "");
        cont.CustomerDescription = changeName;
        let contactPersonName
        if(cont.ContactActualTitle  != '') {
          contactPersonName = cont.contact_name + ' ' + '(' + cont.ContactActualTitle + '), ' + cont.CustomerDescription;
        } else {
          contactPersonName = cont.contact_name + ', ' + cont.CustomerDescription;
        }
         
        cont.contactDetailName = contactPersonName;
        array.push(contactPersonName);
        this.storeAllcontacts.push(cont);
      });
    });
    let obj: Searchcustomers = { letter: 'CONTACTS', names: array };
    this.customersList.push(obj);
  }

  // method for selecting the customer from autocomplete
  selectedOne(group: any, name: string) {
    this.selectedName = name;
    this.selectedGroup = group.letter;
    let myElements = document.querySelectorAll(".cdk-overlay-container");
    for (let i = 0; i < myElements.length; i++) {
      if (myElements[i].classList.contains('show-data') === true) {
        myElements[i].classList.remove('show-data');
      }
      myElements[i].classList.add('hide-data');
      this.changeLayoutofAutocomplete = false;
    }
    if (group.letter === 'ACCOUNTS') {
      this.emptyInputvalue = true
      this.storeAllcustomers.forEach(customer => {
        if (customer.customer_name === name) {
          this.customerCode = customer.CustomerCode;
        }
      })
    } else {
      this.emptyInputvalue = true
      this.storeAllcontacts.forEach(customerContact => {
        if (customerContact.contactDetailName === name) {
          this.customerCode = customerContact.CustomerCode;
        }
      })
    }
    this.moveTocustomerPage();
    this.emptyInputvalue = false;
  }

  // disable and enable the search button based on input have value are not
  checkInputvaluelength(event: string) {
    let myElements = document.querySelectorAll(".cdk-overlay-container");
    for (let i = 0; i < myElements.length; i++) {
      if (event.length >= 1) {
        if (myElements[i].classList.contains('hide-data') === true) {
          myElements[i].classList.remove('hide-data');
          myElements[i].classList.add('show-data');
          this.changeLayoutofAutocomplete = true;
        }
      } else {
        if (myElements[i].classList.contains('show-data') === true) {
          myElements[i].classList.remove('show-data');
          myElements[i].classList.add('hide-data');
          this.changeLayoutofAutocomplete = false;
        }
      }


    }

    if (event.length != 0) {
      this.emptyInputvalue = true;
    } else {
      this.emptyInputvalue = false;
    }
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }


  // method for redirecting to customer page
  moveTocustomerPage() {
    if (this.selectedName != '' && this.customerCode != null) {
      this.customerForm.controls['customerInformation'].setValue('');
      if (this.customerCode != parseInt(this.service.existedCustomerCode)) {
        this.router.navigate(['/customer/', this.customerCode]);
      }

      this.service.changeDataBasedOnId(this.customerCode.toString());
      this.service.sendGroupName(this.selectedGroup);
    }
  }

  
  
 
  gotoHome(){
    sessionStorage.clear();
    this.router.navigateByUrl('/');
  }
}

export interface Searchcustomers {
  letter: string;
  names: string[];
}



export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};
