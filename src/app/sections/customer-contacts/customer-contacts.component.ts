import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from '../_modal';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Customercontacts, Contactinfluence } from 'src/app/classesList/customer';
import { CustomerService } from 'src/app/services/customerService';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboardService';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-contacts',
  templateUrl: './customer-contacts.component.html',
  styleUrls: ['./customer-contacts.component.css']
})
export class CustomerContactsComponent implements OnInit, OnDestroy {

  modalName: string;
  contact: string;
  customerContacts:  Customercontacts[] = [];
  contactInfluences: Contactinfluence[] = [];
  customerContantsList: Customercontacts[] = [];
  showInfluence: boolean;
  emittedObservableValue: Subscription;
  getAllheadings: any = {};
  startDate = new Date();
  endDate = new Date();
  openContactModal: boolean;
  storedCustomerId: string;
  constructor(private dashboardService: DashboardService, private modalService: ModalService, private service: CustomerService, private activatedRouter: ActivatedRoute, private datePipe: DatePipe) {
    this.showInfluence = false;
    this.openContactModal = false;
    this.getAllHedingsData();
  }

  ngOnInit() {
    let customerCode: string
    this.activatedRouter.paramMap.subscribe((params : ParamMap) => {
      customerCode = params.get('id');
    })
    this.emittedObservableValue = this.service.sendedData.subscribe(changedCustomerCode => {
      if(changedCustomerCode != '') {
        this.customerContacts = [];
        this.getAllContacts(changedCustomerCode);
        //this.getAllContactinfluences(changedCustomerCode);
      } else {
        this.customerContacts = [];
        this.getAllContacts(customerCode);
        //this.getAllContactinfluences(customerCode);
      }
});



   
   
  }

 
  // method for getAllHeadings
  getAllHedingsData() {
   if(this.dashboardService.storeAllheadings != undefined) {
      this.getAllheadings = this.dashboardService.storeAllheadings;
      this.modalName = this.getAllheadings.customerContactsId;
    } else {
       let data = sessionStorage.getItem('headingsData');
       this.getAllheadings = JSON.parse(data);
        this.modalName = this.getAllheadings.customerContactsId;
    }
  }

  

  // method used for open the widget into modal popup to show entire data.
  openModal() {
    this.modalService.open(this.modalName);
   }

   // method used for close the widget modal popup.
   closeModal() {
    this.modalService.close(this.modalName);
  }
  // getContacts(){
  //   this.service.getContacts((contactname) => {
  //    this.contact = contactname;
  //   });
  // }

  randomDate(start, end) {
    var date = new Date(+start + Math.random() * (end - start));
    return date;
  }

  // method for getting all contacts
  getAllContacts(customerCode: string) {
   let cont = sessionStorage.getItem('contactsData');
   this.customerContantsList = [];
   let customerContacts = [];
   if(cont != null) {
     customerContacts = JSON.parse(cont).filter(contact => contact.CustomerCode === parseInt(customerCode));
     customerContacts.sort((a, b) => {
      if (a.T12M > b.T12M) return -1;
      else if (b.T12M > a.T12M) return 1;
      else return 0;
    });
    
    customerContacts.forEach((contact, index) => {
      
     contact.average_order_value = this.convertNumber(contact.average_order_value);
     contact.customerT12M = contact.T12M;
     contact.T12M = this.convertNumber(contact.T12M);
   
       if(contact.influencer === 1) {
          this.customerContantsList.push(contact);
         }

         contact.total_calls = contact.inbound_calls + contact.outbound_calls;
         contact.total_emails = contact.inbound_emails + contact.outbound_emails;

         contact.callsPercent = (contact.outbound_calls/contact.total_calls)*100;
         contact.emailsPercent = (contact.outbound_emails/contact.total_emails)*100;

         contact.compareInboundcalls = ((contact.inbound_calls - contact.pm_inbound_calls)/contact.pm_inbound_calls)*100;
         contact.comapreOutboundcalls = ((contact.outbound_calls - contact.pm_outbound_calls)/contact.pm_outbound_calls)*100;

         contact.compareInboundemails = ((contact.inbound_emails - contact.pm_inbound_emails)/contact.pm_inbound_emails)*100;
         contact.comapreOutboundemails = ((contact.outbound_calls - contact.pm_outbound_emails)/contact.pm_outbound_emails)*100;

    });

    this.sortContacts(customerContacts);
}
else {
    let customerContacts = [];
    let emptyT12Marray = [];
    this.service.getAllcustomercontacts().subscribe(contacts => {
      sessionStorage.setItem('contactsData', JSON.stringify(contacts));
      customerContacts = contacts.filter(contact => contact.CustomerCode === parseInt(customerCode));

      customerContacts.sort((a, b) => {
        if (a.T12M > b.T12M) return -1;
        else if (b.T12M > a.T12M) return 1;
        else return 0;
      });
      
      customerContacts.forEach((contact, index) => {
       contact.average_order_value = this.convertNumber(contact.average_order_value);
       contact.customerT12M = contact.T12M;
       contact.T12M = this.convertNumber(contact.T12M);
     
         if(contact.influencer === 1) {
            this.customerContantsList.push(contact);
           }

           contact.total_calls = contact.inbound_calls + contact.outbound_calls;
           contact.total_emails = contact.inbound_emails + contact.outbound_emails;

           contact.callsPercent = (contact.outbound_calls/contact.total_calls)*100;
           contact.emailsPercent = (contact.outbound_emails/contact.total_emails)*100;

           contact.compareInboundcalls = ((contact.inbound_calls - contact.pm_inbound_calls)/contact.pm_inbound_calls)*100;
           contact.comapreOutboundcalls = ((contact.outbound_calls - contact.pm_outbound_calls)/contact.pm_outbound_calls)*100;

           contact.compareInboundemails = ((contact.inbound_emails - contact.pm_inbound_emails)/contact.pm_inbound_emails)*100;
           contact.comapreOutboundemails = ((contact.outbound_calls - contact.pm_outbound_emails)/contact.pm_outbound_emails)*100;
     });
         this.sortContacts(customerContacts);
        
     });
   }
  
   setTimeout(x => {
    if(this.service.selectedGroupofCustomer != 'ACCOUNTS' && this.service.selectedGroupofCustomer != undefined) {
      this.openModal();
     }
  }, 300);
}

sortContacts(customerContacts: any) {
   let emptyT12Marray = [];
   let totalContactsarray = [];
   emptyT12Marray = customerContacts.filter(t12 => t12.T12M === 0 || t12.T12M === '');
   totalContactsarray = customerContacts.filter(t12m => t12m.T12M != 0 && t12m.T12M != '');
  if(emptyT12Marray.length != 0) {
    emptyT12Marray.sort((a, b) => {
      if (a.total_calls > b.total_calls) return -1;
      else if (b.total_calls > a.total_calls) return 1;
      else return 0;
    });
    let finalarray = [...totalContactsarray, ...emptyT12Marray];
    this.customerContacts = finalarray;
   } 
  else {
    this.customerContacts = customerContacts;
  }
}

  // method for getting all contact influences
  getAllContactinfluences(customerCode: string) {
      
      let influences = sessionStorage.getItem('influencesData');
      this.contactInfluences = [];
      if(influences != null) {
        JSON.parse(influences).forEach(influence => {
          if(influence.customer_code === parseInt(customerCode)) {
            influence.fullName = influence.First_Name +' '+ influence.Last_Name;
            this.contactInfluences.push(influence);
          }
  
        })
      } else {
        this.service.contactInfluence().subscribe(contInfluence => {
          sessionStorage.setItem('influencesData', JSON.stringify(contInfluence));
          contInfluence.forEach(influence => {
            if(influence.customer_code === parseInt(customerCode)) {
              influence.fullName = influence.First_Name +' '+ influence.Last_Name;
              this.contactInfluences.push(influence);
            }
    
          })
          
        });
     }
    
  }

  ngOnDestroy() {
    this.emittedObservableValue.unsubscribe();
  }

  convertNumbertoInteger(num:any){
    return num.toFixed(0).toLocaleString()+' %';
  }


  convertNumber(num:any) {
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
    if(num!='')
      return num.toFixed(2);
    else
      return num;
  }
}
