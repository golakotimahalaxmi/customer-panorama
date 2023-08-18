import { Component, OnInit } from '@angular/core';
import { ModalService } from '../_modal';
import { DashboardService } from 'src/app/services/dashboardService';

@Component({
  selector: 'app-customer-similar',
  templateUrl: './customer-similar.component.html',
  styleUrls: ['./customer-similar.component.css'],
  
})
export class CustomerSimilarComponent implements OnInit {

  modalName: string;
  getAllheadings: any = {};
  constructor(private modalService: ModalService, private dashboardService: DashboardService) { 
    this.getAllHedingsData();
  }

  ngOnInit() {
    
  }

    // method for getAllHeadings
    getAllHedingsData() {
    if(this.dashboardService.storeAllheadings != undefined) {
        this.getAllheadings = this.dashboardService.storeAllheadings;
        this.modalName = this.getAllheadings.customerSimilarId;
      } else {
         let data = sessionStorage.getItem('headingsData');
         this.getAllheadings = JSON.parse(data);
          this.modalName = this.getAllheadings.customerSimilarId;
      }
    }

  // method used for open the widget into modal popup to show entire data.
  openModal() {
    this.modalService.open(this.modalName);
   }
 closeModal() {
    this.modalService.close(this.modalName);
  }

}
