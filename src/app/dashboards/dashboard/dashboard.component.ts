import { Component, OnInit, ViewChild } from "@angular/core";
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
    this.dashboardService.pageName = "dashboard";
    console.log(this.service.customerType);
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
    } else if (this.service.customerType === "petroleum") {
      this.stackHolderName = "petroleum";
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
    } else if (this.service.customerType === "food") {
      this.stackHolderName = "food";
      this.dashboardService.widgetPositions =
        this.dashboardService.corporate_Widget;
      this.widgetPositions = this.dashboardService.widgetPositions;
    } else if (this.service.customerType === "transportation") {
      this.stackHolderName = "transportation";
      this.dashboardService.widgetPositions =
        this.dashboardService.corporate_Widget;
      this.widgetPositions = this.dashboardService.widgetPositions;
    } else if (this.service.customerType === "petroleum") {
      this.stackHolderName = "petroleum";
      this.dashboardService.widgetPositions =
        this.dashboardService.corporate_Widget;
      this.widgetPositions = this.dashboardService.widgetPositions;
    } else {
      this.stackHolderName = "corporate";
      this.dashboardService.widgetPositions =
        this.dashboardService.small_biz_Widget;
      this.widgetPositions = this.dashboardService.widgetPositions;
    }
  }

  onDrop(event: CdkDragDrop<string[]>) {
    console.log(event.previousIndex);
    console.log(event.currentIndex);
    moveItemInArray(
      this.widgetPositions,
      event.previousIndex,
      event.currentIndex
    );
  }

  ngOnInit() {
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
