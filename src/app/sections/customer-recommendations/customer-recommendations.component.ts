import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ModalService } from '../_modal';
import { DashboardService } from 'src/app/services/dashboardService';
import { Recommandation } from 'src/app/classesList/customer';
import { CustomerService } from 'src/app/services/customerService';
import * as pbi from 'powerbi-client';

@Component({
  selector: 'app-customer-recommendations',
  templateUrl: './customer-recommendations.component.html',
  styleUrls: ['./customer-recommendations.component.css']
})

export class CustomerRecommendationsComponent implements OnInit {

  modalName: string;
  getAllheadings: any = {};
  recommandations: Recommandation[] = [];
  public screenHeight:number;

  constructor(private modalService: ModalService, private dashboardService: DashboardService, private service: CustomerService) {
    this.getAllHedings();
    this.getAllrecommandations();
  }

  ngOnInit() {
    
  }

  // method for getAllrecommandations

  getAllrecommandations() {
    this.service.getRecommandation().subscribe(recommandation => {
      recommandation.forEach(recommandationVal => {
        let totalValue = (recommandationVal.total_value/1000).toFixed(2);
        recommandationVal.total_value = parseInt(totalValue);

        recommandationVal.product.forEach(product => {
          let productValue = (product.product_value/1000).toFixed(2);
          product.product_value = parseInt(productValue);
        })
      })
      this.recommandations = recommandation;
    });
  }

    // method for getAllHeadings
    getAllHedings() {
     if(this.dashboardService.storeAllheadings != undefined) {
        this.getAllheadings = this.dashboardService.storeAllheadings;
        this.modalName = this.getAllheadings.recommendationsId;
      } else {
         let data = sessionStorage.getItem('headingsData');
         this.getAllheadings = JSON.parse(data);
          this.modalName = this.getAllheadings.recommendationsId;
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
