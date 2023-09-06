import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { DashboardService } from "src/app/services/dashboardService";
import { Headings } from "src/app/classesList/customer";
import { ModalService } from "../_modal";
import { CustomerService } from "src/app/services/customerService";

@Component({
  selector: "app-side-navigation",
  templateUrl: "./side-navigation.component.html",
  styleUrls: ["./side-navigation.component.css"],
})
export class SideNavigationComponent implements OnInit {
  link_highlight = 0;
  headings: any = {};
  cdwTooltipName: string;
  displayStyle = "none";
  setting_icon: boolean = true;
  home_icon: boolean = true;
  analytics_icon:boolean=true;
  features_icon:boolean=true;
  public isValid :boolean =false;

  @Output() openDirectWidget: EventEmitter<string> = new EventEmitter<string>();

  sideNavitems = [
    {
      itemIcon: "assets/images/customers.png",
      href: "#",
      itemName: "Customers",
      border: "no",
      bottom: "yes",
      next: "yes",
      toolTip: "View your book of customers",
      link: "yes",
      last: "no",
      sublist: ["1", "2"],
    },
    {
      itemIcon: "assets/images/icons/contacts-inactive.png",
      href: "#",
      itemName: "Contacts",
      border: "no",
      bottom: "yes",
      next: "yes",
      toolTip:
        "Coming Soon! View all contacts within your book of customers. Filter by customers, top purchasers, etc",
      link: "no",
      last: "no",
    },
    {
      itemIcon: "assets/images/reports.png",
      href: "/reports",
      itemName: "Reports",
      border: "no",
      bottom: "yes",
      next: "no",
      toolTip:
        "Reports to help track important information like Conversion Rates, Goal Tracking, etc",
      link: "yes",
      last: "no",
    },
    {
      itemIcon: "assets/images/icons/add-shortcut-inactive.png",
      href: "#",
      itemName: "Add Shortcut",
      border: "no",
      bottom: "no",
      next: "yes",
      toolTip: "Coming Soon! Add shortcuts to your menu for easy access",
      link: "no",
      last: "yes",
    },
  ];
  constructor(
    private router: Router,
    private service: CustomerService,
    private dashboard: DashboardService,
    private modelService: ModalService
  ) {
    this.headings = new Headings();
    if (this.router.url.split("/")[1] === "customer") {
      this.link_highlight = 0;
      this.selectedNavItem(
        this.sideNavitems[this.link_highlight],
        this.link_highlight
      );
    }
    if (this.router.url.split("/")[1] === "reports") {
      this.link_highlight = 2;
      this.selectedNavItem(
        this.sideNavitems[this.link_highlight],
        this.link_highlight
      );
    }
  }

  ngOnInit() {
    this.dashboard.getAllheadings().subscribe((headings) => {
      this.headings = headings;
      this.cdwTooltipName = this.headings.tip_home_leftnav_cdw;
    });
  }

  selectedNavItem(item: any, indVal: number) {
    if (item.link === "yes")
      this.sideNavitems.forEach((val, index) => {
        if (val.itemName === item.itemName) {
          val.border = "yes";
          if (index > 0) this.sideNavitems[index - 1].bottom = "no";
        } else {
          val.border = "no";
          val.bottom = "yes";
        }
      });
    this.sideNavitems[3].bottom = "no";
  }

  openCustomersExpanded(item: any) {
    if (item.itemName === "Customers") {
      this.dashboard.openModals("customer");
    }
  }

  getDetails() {
    this.isValid=false;
    this.setting_icon = true;
    this.home_icon = true;
    this.analytics_icon = true;
    this.features_icon = true;
    this.router.navigate(["/dashboard"]);
  }
  openPopup() {
    this.displayStyle = "block";
    this.isValid=false;
  }

 

  closePopup() {
    this.displayStyle = "none";
  }

  openDashboard(selectvalue: any) {
    this.setting_icon = false;
    this.home_icon = false;
    this.analytics_icon = true;
    this.features_icon = true;
    this.service.customerType = selectvalue;
    this.router.navigate(["/dashboard"]);
    this.openDirectWidget.emit(selectvalue);   
   this.displayStyle = "none";
  }

  getanalytics(){
    this.isValid = false;
    this.analytics_icon = false;
    this.home_icon = false;
    this.setting_icon= true;
    this.features_icon =true;
  }
 
  getfeatures(){
    this.isValid = true;
    this.features_icon=false;
    this.analytics_icon = true;
    this.home_icon = false;
    this.setting_icon = true;  
  }

  getfeature(val: any) {
    this.modelService.open(val);
  }
}