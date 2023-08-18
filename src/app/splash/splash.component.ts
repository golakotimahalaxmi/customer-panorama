import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customerService';
import { Router } from '@angular/router';
import { DashboardService} from 'src/app/services/dashboardService';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  allHeadings:any = {};
  splashTooltip:string = "Click here to launch the Customer Mosaic experience for customers in CDW’s Corporate segment";
  small_Biz_Tooltip:string = "Click here to launch the Customer Mosaic experience for customers in CDW’s Small Business segment";

  constructor(private service: CustomerService, private router: Router, private dashboardService:DashboardService) { }

  ngOnInit() {
    this.getAllHedings();
  }

  changeCustomer(business:string){
    sessionStorage.clear();
    this.service.setCustomerType(business);
    sessionStorage.setItem('stackHolderName', business);
    this.router.navigate(['/']);
  }

  getAllHedings() {
     this.dashboardService.getAllheadings().subscribe(headings => {
        this.allHeadings = headings;
        this.dashboardService.subscribeAllheadings(headings);
      })
    } 

}
