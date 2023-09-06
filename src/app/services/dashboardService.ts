import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { Headings, widget } from "../classesList/customer";

@Injectable({ providedIn: "root" })
export class DashboardService {
  storeAllheadings: any;
  pageName: string;
  widgetPositions: widget[];
  corporate_Widget: widget[] = [
    { name: "newsalerts", isFull: false, size: 1, widget2: "insights" },
    { name: "customerMenu", isFull: true, size: 1, widget2: "" },
    { name: "customerEvents", isFull: true, size: 1, widget2: "" },
  ];

  small_biz_Widget: widget[] = [
    { name: "newsalerts", isFull: true, size: 1, widget2: "" },
    { name: "customerMenu", isFull: true, size: 1, widget2: "" },
    { name: "customerEvents", isFull: true, size: 1, widget2: "" },
  ];

  small_business_Widget: widget[] = [
    { name: "newsalerts", isFull: false, size: 1, widget2: "funding" },
    { name: "customerMenu", isFull: true, size: 1, widget2: "" },
    { name: "customerEvents", isFull: true, size: 1, widget2: "" },
  ];
  
  transportation_Widget: widget[] = [
    { name: "newsalerts", isFull: false, size: 1, widget2: "insights" },
    { name: "customerMenu", isFull: true, size: 1, widget2: "" },
    { name: "customerEvents", isFull: true, size: 1, widget2: "" },
  ];

  constructor(private http: HttpClient) {}

  getAllheadings() {
    return this.http.get("assets/data/data_en.json");
  }
  subscribeAllheadings(heading: any) {
    let headingValues = sessionStorage.getItem("headingsData");
    if (headingValues != null) {
      let headings = JSON.parse(sessionStorage.getItem("headingsData"));
      this.storeAllheadings = headings;
    } else {
      sessionStorage.setItem("headingsData", JSON.stringify(heading));
      let headings = JSON.parse(sessionStorage.getItem("headingsData"));
      this.storeAllheadings = headings;
    }
  }

  private openModel: BehaviorSubject<string> = new BehaviorSubject("");
  openModalFromLeftNav = this.openModel.asObservable();
  openModals(event: string) {
    this.openModel.next(event);
  }

  private opencontactModel: BehaviorSubject<string> = new BehaviorSubject("");
  opencontactModelleftNav = this.opencontactModel.asObservable();
  openContactswidget(eventName: string) {
    this.opencontactModel.next(eventName);
  }
}
