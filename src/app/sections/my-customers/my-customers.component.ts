import { Component, OnInit, QueryList, ViewChildren, ViewEncapsulation, OnDestroy, Input } from '@angular/core';
import { ModalService } from '../_modal';
import { Router } from '@angular/router';
import { MycustomersDetails, Headings } from 'src/app/classesList/customer';
import { Observable, Subscription } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/directives/sortable.directive';
import { CustomerService } from 'src/app/services/customerService';
import { DashboardService } from 'src/app/services/dashboardService';

@Component({
  selector: 'app-my-customers',
  templateUrl: './my-customers.component.html',
  styleUrls: ['./my-customers.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyCustomersComponent implements OnInit, OnDestroy {
  @Input() isFull: boolean;
  @Input() widget2: boolean;
  modalName: string;
  customersList$: Observable<MycustomersDetails[]>;
  total$: Observable<number>;
  viewCustomersList: MycustomersDetails[] = [];
  selectedIndex: number;
  allHeadings: any = {};
  unSubscribe: Subscription;
  currentYear:number = new Date().getFullYear();


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  constructor(private dashboardService: DashboardService, private modalService: ModalService, public service: CustomerService, private router: Router) {
  }

  ngOnInit() {
    this.getAllHedings();
    this.getCustomersData();
    this.openModalfromsidenav();
  }


  // method for opening modal popup
  openModalfromsidenav() {
    this.unSubscribe = this.dashboardService.openModalFromLeftNav.subscribe(modalName => {
       if(modalName === 'customer') {
           this.openModal();
       } 
     })
  }


  // method for getting all headings
  getAllHedings() {
    
    if(this.dashboardService.storeAllheadings === undefined || this.dashboardService.storeAllheadings === null) {
      this.dashboardService.getAllheadings().subscribe(headings => {
        
        if(headings != undefined && headings != null) {
           this.allHeadings = headings;
          this.modalName = this.allHeadings.myAccountsid;
          this.dashboardService.subscribeAllheadings(headings);
        }
       })
    } else {
    this.allHeadings = this.dashboardService.storeAllheadings;
      this.modalName = this.allHeadings.myAccountsid;
    }
  }

  // method for calling customer data when widget is opening
  exploreCustomersList(event: boolean) {
    this.customersList$ = this.service.customers$;
    this.total$ = this.service.total$;
  } 

  // method used for open the widget into modal popup to show entire data.
  openModal() {
    this.customersList$ = this.service.customers$;
    this.total$ = this.service.total$;
    this.onSort({column: "customer_name", direction: "asc"});
    this.modalService.open(this.modalName);
  }

  // method for sorting the rows based on search item ..
  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  closeModal() {
    this.modalService.close(this.modalName);
  }

  // method for fecthing customersListData from services
  getCustomersData() {
    let customerData = sessionStorage.getItem('customersDetails');
    if(customerData != null) {
      this.viewCustomersList = JSON.parse(customerData);
      this.service.saveCustomerDetails(this.viewCustomersList);
     } else {
      this.service.getMycustomersList().subscribe(customer => {
        customer.forEach(customerVal => {
           let findHighestValue = [];
           let changeName = customerVal.customer_name.replace(/ *\([^)]*\) */g, "");
           customerVal.customer_name = changeName;
           let dateValue = (customerVal.customer_created_date).toString();
           let year = dateValue.substr(0, 4);
           let month = dateValue.substr(4, 2);         
           let date = dateValue.substr(6, 2);
           customerVal.tenure = this.currentYear - Number(year);
  
          
           customerVal.createdDate = date+'/'+month+'/'+year;
  
           let customerValp12: any
           if(customerVal.P12Tm != 'NULL') {
            customerValp12 = customerVal.P12Tm;
            findHighestValue.push(customerValp12)
            } else {
             customerValp12 = 0;
             findHighestValue.push(customerValp12)
            }
            customerVal.P12Tm = customerValp12;
        
  
           if(customerVal.customer_last_invoice_date != 0) {
            let dateValue1 = (customerVal.customer_last_invoice_date).toString();
            let year1 = dateValue.substr(0, 4);
            let month1 = dateValue.substr(4, 2);         
            let date1 = dateValue.substr(6, 2);
  
            customerVal.invoiceDate = date1+'/'+month+'/'+year
           } else {
             customerVal.invoiceDate = '01/01/1992';
           }
           let changeMoney = this.convertNumber(customerVal.it_expenditure_potential);
           customerVal.expenditurePotential = changeMoney;
  
           let percentageForcaptured = (customerVal.it_expenditure_potential - customerVal.expenditure_captured)
           if(percentageForcaptured == 0) {  
              customerVal.capturedPercentage = '0';
           } else {
            let changePercentcaptured = percentageForcaptured/customerVal.it_expenditure_potential*100; 
            customerVal.capturedPercentage = changePercentcaptured.toFixed(2).toString();
           }
       
           let customerValC12: any
           if(customerVal.C12TM != 'NULL') {
            customerValC12 = customerVal.C12TM;
            customerVal.customerC12 = this.convertNumber(customerVal.C12TM);
            findHighestValue.push(customerVal.C12TM);
          } else {
             customerValC12 = 0;
             customerVal.customerC12 = customerValC12;
             findHighestValue.push(customerValC12);
            }
            customerVal.avgspend = this.convertNumber(customerValC12/12);
            customerVal.C12TM = customerValC12;
  
           let customerValpp12: any
           if(customerVal.PP12TM != 'NULL') {
             customerValpp12 = (customerVal.PP12TM);
             findHighestValue.push(customerValpp12);
             } else {
             customerValpp12 = 0;
             findHighestValue.push(customerValpp12);
            }
            customerVal.PP12TM = customerValpp12;
          
          
  
  
            let maxValue = Math.max.apply(null, findHighestValue);
  
            if(customerVal.P12Tm != 0) {
                 customerVal.P12TmProgress = (customerVal.P12Tm/maxValue)*100;
            }else {
              customerVal.P12TmProgress = 0;
            }
  
            if(customerVal.C12TM != 0) {
              customerVal.C12TMProgress = (customerVal.C12TM/maxValue)*100;
         }else {
           customerVal.C12TMProgress = 0;
         }
  
         if(customerVal.PP12TM != 0) {
          customerVal.PP12TMProgress = (customerVal.PP12TM/maxValue)*100;
     }else {
       customerVal.PP12TMProgress = 0;
     }
  });
  
         
  
          customer.sort((a, b) => {
            if (a.customer_name < b.customer_name) return -1;
            else if (a.customer_name > b.customer_name) return 1;
            else return 0;
          });
            sessionStorage.setItem('customersDetails', JSON.stringify(customer));
            this.viewCustomersList = customer;
            this.service.saveCustomerDetails(this.viewCustomersList);
        });
    }
    
  }

  // method for redirecting the page for selecting the particular customer
  selectedCustomer(customers: MycustomersDetails) {
    this.router.navigate(['/customer' +'/'+ customers.CustomerCode])
    this.service.sendGroupName('ACCOUNTS');
  }
  covertToMillion(num:any){
    return (num / 1000000).toFixed(2);
  }

  convertNumber(num:any) {
    if(num != '' && num != 'NULL' && num != NaN) {
       // Alter numbers larger than 1k
    if (num >= 1e3) {
      var units = ["K", "M", "B", "T"];
      
      var order = Math.floor(Math.log(num) / Math.log(1000));
  
      var unitname = units[(order - 1)];
      var num1 = (num / 1000 ** order).toFixed(2);
      
      // output number remainder + unitname
      return num1 + unitname
    }
    // return formatted original number
    return num.toFixed(2).toLocaleString();
    } else {
      return num = '0';
    }
    
  }

  convertNumbertoInteger(num: any){
    let val = NaN;
  if(num != Infinity &&  isNaN(num) === false) {
     return num.toFixed(0).toLocaleString()+' %';
     } else {
      return num = '0' + ' %';
    }
    
  }


  ngOnDestroy() {
    if(this.unSubscribe != undefined) {
      this.unSubscribe.unsubscribe();
    }
  }
}
