import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit, ViewChild } from "@angular/core";
import { CustomerService } from "src/app/services/customerService";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { DashboardService } from "src/app/services/dashboardService";
import { widget } from "src/app/classesList/customer";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  allHeadings: any = {};
  modalName: any;
  widgetPositions: widget[];

  componentRef: any;
  stackHolderName: string;

  constructor(
    private dashboardService: DashboardService,
    private service: CustomerService
  ) {

  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.widgetPositions,
      event.previousIndex,
      event.currentIndex
    );
  }

  ngOnInit() {
    this.getSelectedDashboard(this.service.customerType)
  }

  getSelectedDashboard(widgetName: any) {
    this.service.setCustomerType(widgetName);
    this.dashboardService.pageName = "dashboard";
    this.widgetPositions = [];
    this.dashboardService.widgetPositions=[];
    if (this.service.customerType === "healthcare") {
      this.stackHolderName = "healthcare";
      this.dashboardService.widgetPositions =
        this.dashboardService.small_biz_Widget;
      this.widgetPositions = this.dashboardService.widgetPositions;
    } else if (this.service.customerType === "smallbusiness") {
      this.stackHolderName = "smallbusiness";
      this.dashboardService.widgetPositions =
        this.dashboardService.small_business_Widget;
      this.widgetPositions = this.dashboardService.widgetPositions;
    } else if (this.service.customerType === "insurace") {
      this.stackHolderName = "insurance";
      this.dashboardService.widgetPositions =
        this.dashboardService.corporate_Widget;
      this.widgetPositions = this.dashboardService.widgetPositions;
    } else if (this.service.customerType === "retail") {
      this.stackHolderName = "retail";
      this.dashboardService.widgetPositions =
        this.dashboardService.corporate_Widget;
      this.widgetPositions = this.dashboardService.widgetPositions;
    } else if (this.service.customerType === "automotive") {
      this.stackHolderName = "automotive";
      this.dashboardService.widgetPositions =
        this.dashboardService.corporate_Widget;
      this.widgetPositions = this.dashboardService.widgetPositions;
    } else if (this.service.customerType === "food-beverages") {
      this.stackHolderName = "food-beverages";
      this.dashboardService.widgetPositions =
        this.dashboardService.corporate_Widget;
      this.widgetPositions = this.dashboardService.widgetPositions;
    } else if (this.service.customerType === "transportation") {
      this.stackHolderName = "transportation";
      this.dashboardService.widgetPositions =
        this.dashboardService.transportation_Widget;
      this.widgetPositions = this.dashboardService.widgetPositions;
    } else if (this.service.customerType === "petroleum") {
      this.stackHolderName = "petroleum";
      this.dashboardService.widgetPositions =
        this.dashboardService.corporate_Widget;
      this.widgetPositions = this.dashboardService.widgetPositions;}
    else if (this.service.customerType === "technology") { 
      this.stackHolderName = "technology";
       this.dashboardService.widgetPositions = this.dashboardService.corporate_Widget; 
       this.widgetPositions = this.dashboardService.widgetPositions; }
    else {
      this.stackHolderName = "corporate";
      this.dashboardService.widgetPositions =
        this.dashboardService.corporate_Widget;
      this.widgetPositions = this.dashboardService.widgetPositions;
    }
    this.getAllHedings();
  }


  getAllHedings() {
    this.dashboardService.getAllheadings().subscribe((headings) => {
      if (headings != undefined) {
        this.allHeadings = headings;
        this.modalName = this.allHeadings.conservationName;
      }
    });
  }

  // findFundingfile() {
  //   this.service.findFundingJson().subscribe((fund: any) => {
  //      this.fundJsonfile = true;
  //   }, (error => {
  //      this.fundJsonfile = false;
  //   }));
  // }
}
