import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboardService';
import { ModalService } from '../_modal';
import { CustomerService } from 'src/app/services/customerService';
import { DatePipe } from '@angular/common';
import { Conversion } from 'src/app/classesList/customer';

@Component({
  selector: 'app-conversions',
  templateUrl: './conversions.component.html',
  styleUrls: ['./conversions.component.css']
})
export class ConversionsComponent implements OnInit {

  modalName: string;
  cardTitle: string;
  allHeadings: any;
  listOfConversions: Conversion[] = [];
  
  constructor(private dashboardService: DashboardService,private modalService: ModalService, private service: CustomerService, private datePipe: DatePipe) { 
    this.getAllHedings();
    this.getCustomerConversionsData();
  }

  ngOnInit() {
  }

  // method for getAllHeadings
  getAllHedings() {
    if(this.dashboardService.storeAllheadings === undefined) {
    this.dashboardService.getAllheadings().subscribe(headings => {
      this.allHeadings = headings;
      this.modalName = this.allHeadings.conservationName;
   })
   } else {
    this.allHeadings = this.dashboardService.storeAllheadings;
     this.modalName = this.allHeadings.conservationName;
   }
  
}

// method for getting the data for conversion services
getCustomerConversionsData() {
  this.service.getConversionData().subscribe(conversion => {
     this.listOfConversions = conversion;
  })
}

// method used for open the widget into modal popup to show entire data.
openModal() {
  this.modalService.open(this.modalName);
 }

 // method used for close the widget modal popup.
 closeModal() {
  this.modalService.close(this.modalName);
}


}
