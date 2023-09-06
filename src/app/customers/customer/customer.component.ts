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

  constructor(private route: ActivatedRoute, private service: CustomerService, private dashboardService: DashboardService) {
    this.dashboardService.pageName = "customer"
    // this.widgetPositions;
    // this.stackHolderName = "healthcare";   
  }

  ngOnInit() {
    if (this.service.customerType === "smallbusiness") {
      this.dashboardService.widgetPositions =
        this.dashboardService.corporate_Widget;
      this.widgetPositions = this.dashboardService.widgetPositions;
    } else if (this.service.customerType === "transportation") {
      this.dashboardService.widgetPositions =
        this.dashboardService.small_biz_Widget;
      this.widgetPositions = this.dashboardService.widgetPositions;
    } else {
      this.dashboardService.widgetPositions =
        this.dashboardService.small_business_Widget;
      this.widgetPositions = this.dashboardService.widgetPositions;
    }   
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.widgetPositions, event.previousIndex, event.currentIndex);
  }

}
