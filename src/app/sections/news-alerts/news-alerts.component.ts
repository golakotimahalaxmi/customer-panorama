import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ModalService } from '../_modal';
import { DatePipe } from '@angular/common';
import { Customernewsalerts, Headings } from 'src/app/classesList/customer';
import { CustomerService } from 'src/app/services/customerService';
import { DashboardService } from 'src/app/services/dashboardService';

@Component({
  selector: 'app-news-alerts',
  templateUrl: './news-alerts.component.html',
  styleUrls: ['./news-alerts.component.css']
})
export class NewsAlertsComponent implements OnInit {
  @Input() isFull: boolean;
  @Input() widget2: string;
  modalName: string;
  allHeadings: any = {};
  fundJsonfile: boolean;
  startDate = new Date();
  endDate = new Date();
  newsAlerts: Customernewsalerts[] = [];

  constructor(private dashboardService: DashboardService, private modalService: ModalService, private service: CustomerService, private datePipe: DatePipe) {
    if(this.service.customerType === 'ryan') {
      this.fundJsonfile = true;
     } else {
    this.fundJsonfile = false;
     }
    this.allHeadings = new Headings();
    this.getAllHedings();
    this.startDate.setDate(this.startDate.getDate() - 2);
    this.getNewsAlerts();
  }

  isTopWidget(){
    if(!this.isFull && this.modalName === this.widget2){
      return true;
    }
    return false;
  }
  ngOnInit() {
     this.allHeadings = new Headings();
    this.getAllHedings();
    this.startDate.setDate(this.startDate.getDate() - 2);
    this.getNewsAlerts();
  }

  // method for getAllHeadings
  getAllHedings() {
    this.dashboardService.getAllheadings().subscribe((headings: any) => {
        this.allHeadings = headings;
        this.modalName = this.allHeadings.newAlertId;
        this.dashboardService.subscribeAllheadings(headings);
      })
  } 
  

  sortNewsOnDate(){
    return this.newsAlerts.sort((a, b) => {
      return <any>new Date(b.posted_on_trust_code) - <any>new Date(a.posted_on_trust_code);
    });
  }
  randomDate(start, end) {
    var date = new Date(+start + Math.random() * (end - start));
    return date;
  }

  // method for getting the customer news alerts from services
  getNewsAlerts() { 
    this.newsAlerts = [];
    // let alertsData = sessionStorage.getItem('newsAlerts');
    // if(alertsData != null) {
    //   this.newsAlerts = JSON.parse(alertsData);
    // } else {
    //   this.service.getAllCustomernewsalerts().subscribe(newsAlerts => {
    //     newsAlerts.forEach(alert => {        
    //       let publishedDateFormat =  this.datePipe.transform(this.randomDate(this.startDate,this.endDate),"hh:mm a");
    //       let time  = publishedDateFormat.split(" ",3);
    //       alert.posted_date = time[0]+" "+time[1];
    //       let dte = new Date();
    //       alert.posted_on = this.datePipe.transform(dte.setDate(dte.getDate() + alert.posted_on),"MM/dd/yy");
    //       let source  = alert.url.split("/",3);
    //       alert.source = source[0]+'//'+source[1]+source[2];
    //       alert.posted_on_trust_code = publishedDateFormat+" "+alert.posted_on
    //     })
    //     sessionStorage.setItem('newsAlerts', JSON.stringify(newsAlerts));
    //     this.newsAlerts = newsAlerts;
    //   })
    // }
       this.service.getAllCustomernewsalerts().subscribe(newsAlerts => {
        newsAlerts.forEach(alert => {        
          let publishedDateFormat =  this.datePipe.transform(this.randomDate(this.startDate,this.endDate),"hh:mm a");
          let time  = publishedDateFormat.split(" ",3);
          alert.posted_date = time[0]+" "+time[1];
          let dte = new Date();
          alert.posted_on = this.datePipe.transform(dte.setDate(dte.getDate() + alert.posted_on),"MM/dd/yy");
          let source  = alert.url.split("/",3);
          alert.source = source[0]+'//'+source[1]+source[2];
          alert.posted_on_trust_code = publishedDateFormat+" "+alert.posted_on
        })
       // sessionStorage.setItem('newsAlerts', JSON.stringify(newsAlerts));
        this.newsAlerts = newsAlerts;
      })
  }

  // method used for open the widget into modal popup to show entire data.
  openModal() {   
      this.modalService.open(this.modalName);
  }
  closeModal() {
    this.modalService.close(this.modalName);
  }
  

}
