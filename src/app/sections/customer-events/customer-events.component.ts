import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../_modal';
import { DatePipe } from '@angular/common';
import { Customerevents, Headings } from 'src/app/classesList/customer';
import { CustomerService } from 'src/app/services/customerService';
import { DashboardService } from 'src/app/services/dashboardService';

@Component({
  selector: 'app-customer-events',
  templateUrl: './customer-events.component.html',
  styleUrls: ['./customer-events.component.css']
})
export class CustomerEventsComponent implements OnInit {
  @Input() isFull: boolean;
  @Input() widget2: string;
  modalName: string;
  show: boolean = false;
  allcustomerEvents: Customerevents[] = [];
  allCustomersrelatedEvents = [];
  allHeadings: any = {};
  startDate = new Date();
  endDate = new Date();

  constructor(private dashboardService: DashboardService, public modalService: ModalService, private service: CustomerService, private datePipe: DatePipe) {
    this.startDate.setDate(this.startDate.getDate() + 10);
    this.callCustomerevents();
   }

   isTopWidget(){
    if(!this.isFull && this.modalName === this.widget2){
      return true;
    }
    else
      return false;
  }

  ngOnInit() {
    if(this.dashboardService.storeAllheadings == undefined) {
      this.getAllHedings();
    } else {
      this.allHeadings = this.dashboardService.storeAllheadings;
      this.modalName = this.allHeadings.customerEventsId;
    }
  }

   // method for getAllHeadings
   getAllHedings() {
    this.dashboardService.getAllheadings().subscribe(headings => {
      this.allHeadings = headings;
      this.modalName = this.allHeadings.customerEventsId;
     })

     this.dashboardService.subscribeAllheadings(this.allHeadings);
   }

  randomDate(start, end) {
    var date = new Date(+start + Math.random() * (end - start));
    return date;
  }

  sortOnDate(){
    return this.allcustomerEvents.sort((a, b) => {
      return <any>new Date(a.event_date_time) - <any>new Date(b.event_date_time);
    });
  }

  // method for fetching all customer events from service
  callCustomerevents() {
    let eventsdata = sessionStorage.getItem('customerEvents');
   if(eventsdata != null) {
      this.allcustomerEvents = JSON.parse(eventsdata);
    } else {
      this.service.getAllCustomerEvents().subscribe(Customerevents => {
        Customerevents.forEach(alert => {
          if(alert.event_dataType === 'My Event') {
            alert.customerMeetings = "Customer Meetings";
          } else {
            alert.customerMeetings = '';
          }
          let publishedDateFormat =  this.datePipe.transform(this.randomDate(this.startDate,this.endDate),"hh:mm a");
          let dte = new Date();
          alert.event_date = this.datePipe.transform(dte.setDate(dte.getDate() + alert.event_date),"MM/dd/yy");
          alert.event_date_time = publishedDateFormat+" "+alert.event_date;
        })
        //sessionStorage.setItem('customerEvents', JSON.stringify(Customerevents));
        this.allcustomerEvents = Customerevents;
      })
    }
    
  }

   // method used for open the widget into modal popup to show entire data.
   openModal() {
    this.modalService.open(this.modalName);
   }

   // method used for close the widget into modal popup.
  closeModal() {
    this.modalService.close(this.modalName);
  }

}
