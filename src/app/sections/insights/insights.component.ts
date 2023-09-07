import { DatePipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Firmographics } from "src/app/classesList/customer";
import { CustomerService } from "src/app/services/customerService";
import { DashboardService } from "src/app/services/dashboardService";
import { ModalService } from "../_modal";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-insights",
  templateUrl: "./insights.component.html",
  styleUrls: ["./insights.component.css"],
})
export class InsightsComponent implements OnInit {
  sortedInsightsData: any;
  updatedData: any[];
  @Input() isFull: boolean;
  @Input() widget2: boolean;
  modalName: string;
  cardTitle: string;
  allHeadings: any;
  funding_tooltip: string = "Fundings related to your book of business";

  customersFundedData: Firmographics[] = [];

  constructor(
    private dashboardService: DashboardService,
    private modalService: ModalService,
    private service: CustomerService,
    private datePipe: DatePipe
  ) {
    this.getAllHedings();
    this.getfirmographicsData();
  }

  ngOnInit() { }

  // method for getAllHeadings
  getAllHedings() {
    if (this.dashboardService.storeAllheadings === undefined) {
      this.dashboardService.getAllheadings().subscribe((headings) => {
        this.allHeadings = headings;
        this.modalName = this.allHeadings.insightsId;
      });
    } else {
      this.allHeadings = this.dashboardService.storeAllheadings;
      this.modalName = this.allHeadings.insightsId;
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

  sortFundingsOnDate() {
    return this.customersFundedData.sort((a, b) => {
      return (
        <any>new Date(b.Funding_Announced_On) -
        <any>new Date(a.Funding_Announced_On)
      );
    });
  }

  // method for all calling the funds data for all customer
  getfirmographicsData() {
    let insightsData = [];
    this.service.getInsights().subscribe((insightsResponse) => {
      // insightsResponse.forEach((insightsData) => {
      //   console.log(insightsData);
      // });
      insightsData = insightsResponse;

      this.sortedInsightsData = insightsData.sort((a, b) =>
        a.customer_name < b.customer_name ? -1 : 1
      );
      this.sortingInsightsData();
    });
  }

  sortingInsightsData() {
    this.updatedData = this.sortedInsightsData.map((item) => {
      const currentDate = new Date();
      const daysToAdd = item.posted_on;
      currentDate.setDate(currentDate.getDate() + daysToAdd);
      const formattedDate = formatDate(currentDate, "dd/MM/yy h:mm a", "en");
      return { ...item, date: formattedDate };
    });
  }
}
