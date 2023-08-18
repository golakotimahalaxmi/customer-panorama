import { Component, OnInit } from '@angular/core';
import { ModalService } from '../_modal';
import { DashboardService } from 'src/app/services/dashboardService';

@Component({
  selector: 'app-customer-graphs',
  templateUrl: './customer-graphs.component.html',
  styleUrls: ['./customer-graphs.component.css']
})
export class CustomerGraphsComponent implements OnInit {

  chartData: Array<any>;
  modalName: string;
  getAllheadings: any;

  constructor(private modalService: ModalService, private dashboardService: DashboardService) {
     this.getAllHedings();
   }

  // method used for open the widget into modal popup to show entire data.
  openModal() {
    this.modalService.open(this.modalName);
   }
 closeModal() {
    this.modalService.close(this.modalName);
  }

  ngOnInit() {
    
    // give everything a chance to get loaded before starting the animation to reduce choppiness
    setTimeout(() => {
      this.generateData();
      // change the data periodically
      setInterval(() => this.generateData(), 10000);
    }, 1000);
  }

   // method for getAllHeadings
   getAllHedings() {
    if(this.dashboardService.storeAllheadings != undefined) {
      this.getAllheadings = this.dashboardService.storeAllheadings;
      this.modalName = this.getAllheadings.customerSpendId;
    } else {
       let data = sessionStorage.getItem('headingsData');
       this.getAllheadings = JSON.parse(data);
        this.modalName = this.getAllheadings.customerSpendId;
    }
  }

  generateData() {
    this.chartData = [];
    for (let i = 0; i < 5; i++) {
      this.chartData.push([
        `Index ${i}`,
        Math.floor(Math.random() * 100)        
      ]);
    }
  }

}
