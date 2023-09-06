import { Component, OnInit, Input } from "@angular/core";
import { ModalService } from "../_modal";
import { CustomerService } from "src/app/services/customerService";
import { DatePipe } from "@angular/common";
import { Firmographics } from "src/app/classesList/customer";
import { DashboardService } from "src/app/services/dashboardService";

@Component({
  selector: "app-fundings",
  templateUrl: "./fundings.component.html",
  styleUrls: ["./fundings.component.css"],
})
export class FundingsComponent implements OnInit {
  @Input() isFull: boolean;
  @Input() widget2: boolean;
  modalName: string;
  cardTitle: string;
  allHeadings: any;
  funding_dataList:any;
  funding_tooltip: string = "Fundings related to your book of business";
  monthNames = [  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',  'Jul', 'Aug', 
      'Sep', 'Oct', 'Nov', 'Dec'];
  customersFundedData: Firmographics[] = [];

  constructor(
    private dashboardService: DashboardService,
    private modalService: ModalService,
    private service: CustomerService,
    private datePipe: DatePipe
  ) {
    
  }

  ngOnInit() {
    this.getAllHedings();
    this.getfirmographicsData();
  }

  // method for getAllHeadings
  getAllHedings() {
    if (this.dashboardService.storeAllheadings === undefined) {
      this.dashboardService.getAllheadings().subscribe((headings) => {
        this.allHeadings = headings;
        this.modalName = this.allHeadings.fundingId;
      });
    } else {
      this.allHeadings = this.dashboardService.storeAllheadings;
      this.modalName = this.allHeadings.fundingId;
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
    let fundingData = [];
    this.service.getAllfirmographics().subscribe((firmo) => {
      firmo.forEach((firmoGraphicData) => {
        let changeMoney = firmoGraphicData.Total_Funding_Amount;
      });

      firmo.sort((a, b) => {
        if (a.customer_name < b.customer_name) return -1;
        else if (a.customer_name > b.customer_name) return 1;
        else return 0;
      });
      fundingData = firmo;

      fundingData.forEach((fund) => {
        if (fund.Money_Raised != "") {
          this.customersFundedData.push(fund);
        }
      });
      
      this.funding_dataList=fundingData;
      this.funding_dataList.forEach((fundingData_item)=>{ 
      if (fundingData_item.Funding_Announced_On!=""){
        fundingData_item['monthNumber']=(this.monthNames.findIndex(monthAbbr => monthAbbr === fundingData_item.Funding_Announced_On.slice(0,3)) + 1+"/"+fundingData_item.Funding_Announced_On.slice(3).replace(", ", "/")).replace(" ","");
    }
    else{
      fundingData_item['monthNumber']='N/A';
    }
  })
    
      
    });
  }

}
function newDate($: any, arg1: { fundingData_item: any; "": any; }): any {
  throw new Error("Function not implemented.");
}

