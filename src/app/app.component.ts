import { Component } from "@angular/core";
import { DashboardService } from "./services/dashboardService";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Customer Profile";
  componentHeadings: any;

  model = {
    left: true,
    middle: false,
    right: false,
  };

  constructor(
    private dashboardService: DashboardService,
    private http: HttpClient
  ) {
    this.dashboardService.getAllheadings().subscribe((headings) => {
      this.componentHeadings = headings;
      sessionStorage.setItem("headingsData", JSON.stringify(headings));
    });

    let values = JSON.parse(sessionStorage.getItem("headingsData"));
    this.dashboardService.subscribeAllheadings(values);
  }
}
