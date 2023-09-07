import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { CustomerService } from 'src/app/services/customerService';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { widget } from 'src/app/classesList/customer';
import { DashboardService } from 'src/app/services/dashboardService';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  refreshCustomerData: boolean;
  widgetPositions: widget[];
  stackHolderName: string;
  insightFlage: boolean = false;
  constructor(private route: ActivatedRoute, private service: CustomerService, private dashboardService: DashboardService) {
    this.dashboardService.pageName = "customer"   
  }

  ngOnInit() {
    let item = [];
    this.dashboardService.widgetPositions =
      this.dashboardService.corporate_Widget;
    this.widgetPositions = this.dashboardService.widgetPositions;
    const paramURL = window.location.href.split("/");
    item = JSON.parse(sessionStorage.getItem("insights"))     
    item.filter(k => {     
      if (k.customer_code === +paramURL[paramURL.length-1])       
        this.insightFlage = true;
       });
    // switch (this.service.customerType) {
    //   case "corporate": {
    //     this.stackHolderName = "corporate";
    //     this.dashboardService.widgetPositions =
    //       this.dashboardService.corporate_Widget;
    //     this.widgetPositions = this.dashboardService.widgetPositions;
    //     break;
    //   }
    //   case "healthcare": {
    //     this.stackHolderName = "healthcare";
    //     this.dashboardService.widgetPositions =
    //       this.dashboardService.corporate_Widget;
    //     this.widgetPositions = this.dashboardService.widgetPositions;
    //     break;
    //   }
    //   case "smallbusiness": {
    //     this.stackHolderName = "smallbusiness";
    //     this.dashboardService.widgetPositions =
    //       this.dashboardService.small_business_Widget;
    //     this.widgetPositions = this.dashboardService.widgetPositions;
    //     break;
    //   }
    //   case "food-beverages": {
    //     this.stackHolderName = "food-beverages";
    //     this.dashboardService.widgetPositions =
    //       this.dashboardService.corporate_Widget;
    //     this.widgetPositions = this.dashboardService.widgetPositions;
    //     break;
    //   }
    //   case "retail": {
    //     this.stackHolderName = "retail";
    //     this.dashboardService.widgetPositions =
    //       this.dashboardService.corporate_Widget;
    //     this.widgetPositions = this.dashboardService.widgetPositions;
    //     break;
    //   }
    //   case "insurance": {
    //     this.stackHolderName = "insurance";
    //     this.dashboardService.widgetPositions =
    //       this.dashboardService.corporate_Widget;
    //     this.widgetPositions = this.dashboardService.widgetPositions;
    //     break;
    //   }
    //   case "technology": {
    //     this.stackHolderName = "technology";
    //     this.dashboardService.widgetPositions =
    //       this.dashboardService.corporate_Widget;
    //     this.widgetPositions = this.dashboardService.widgetPositions;
    //     break;
    //   }
    //   case "petroleum": {
    //     this.stackHolderName = "petroleum";
    //     this.dashboardService.widgetPositions =
    //       this.dashboardService.corporate_Widget;
    //     this.widgetPositions = this.dashboardService.widgetPositions;
    //     break;
    //   }
    //   case "transportation": {
    //     this.stackHolderName = "transportation";
    //     this.dashboardService.widgetPositions =
    //       this.dashboardService.corporate_Widget;
    //     this.widgetPositions = this.dashboardService.widgetPositions;
    //     break;
    //   }
    //   case "automotive": {
    //     this.stackHolderName = "automotive";
    //     this.dashboardService.widgetPositions =
    //       this.dashboardService.corporate_Widget;
    //     this.widgetPositions = this.dashboardService.widgetPositions;
    //     break;
    //   }
    // }     
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.widgetPositions, event.previousIndex, event.currentIndex);
  }

}
