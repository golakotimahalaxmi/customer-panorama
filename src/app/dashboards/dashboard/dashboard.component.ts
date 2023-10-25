import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild } from "@angular/core";
import { CustomerService } from "src/app/services/customerService";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { DashboardService } from "src/app/services/dashboardService";
import { MycustomersDetails, widget } from "src/app/classesList/customer";
import { Chart } from 'chart.js';
import { Observable } from "rxjs/internal/Observable";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  updatedData=[];
  allHeadings: any = {};
  modalName: any;
  widgetPositions: widget[];
  viewCustomersList:any;
  public chart: any;
  chart1:any = 'graph1'
  chart2:any = 'graph2'
  componentRef: any;
  stackHolderName: string;
  currentYear: number = new Date().getFullYear();
  customersList$: Observable<MycustomersDetails[]>;
  total$: Observable<number>;
  router: any;
  isactive:boolean=true;
  isactive1:boolean=false; 
  isactive2:boolean=false

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

  sortingInsightsData() {
    this.updatedData = this.viewCustomersList.map((item) => {
      const daysToAdd = item.customerC12;
     
      const formattedval = daysToAdd/4;
      return { ...item, qtdData: formattedval};
    });
       sessionStorage.setItem("insights", JSON.stringify(this.updatedData));
       console.log(this.updatedData);
  }
  
  ytddisplay(btn:string,res:any){
    if(btn==='btn1')
    {
      this.isactive=true;
      this.isactive1=false;
      this.isactive2=false;
    }
    else if(btn==='btn2')

    {
      this.isactive1=true;
      this.isactive2=false;
      this.isactive=false;
    }
    else if(btn==='btn3')
    {
      
        this.isactive=false;
        this.isactive1=false;
        this.isactive2=true;
     
    }
  }
  
   
  
  

  // createChart(){
  //   var ctx = document.getElementById('MyChart');

  //   var stackedBar = new Chart(ctx, {
       
  //     type: 'line', //this denotes tha type of chart
      
  //     data: {
  //       labels: ['2022-05-17', '2022-05-11', '2022-05-12','2022-05-13',
	// 							 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17','2022-05-19','2022-05-17'], 
	//        datasets: [
  //         {
  //           label: "",
  //           data: [ '9','8.5','9','9','9','8.7','9','8.2','9'],
  //                borderColor: '#0E9CFF',
  //                backgroundColor: '#9BD0F5',
  //                borderWidth:1.5
  //         } 
  //       ]
  //     },
  //     options: {
  //       title: {
  //         text: '',
  //         display: true
  //     },
  //     elements: {
  //       point:{
  //           radius: 0
  //       }
  //   },
  //     scales: {
  //       y: {
  //         grid: {
  //             drawBorder: false, // <-- this removes y-axis line
  //             lineWidth: 0.5,
  //         }
  //     },
  //         xAxes: [{
  //           display: false,
  //             ticks: {
  //                 display: false
  //             }
  //         }],
  //         yAxes: [{
  //           display: false,
  //           ticks: {
  //               display: false
  //           }
  //       }]
  //     },
     
  //     legend: {
  //         display: false
  //     }  
  //     }
      
  //   });
     
      
  // }
  // createChart2(){
  //   var ctx = document.getElementById('MyChart2');

  //   var stackedBar = new Chart(ctx, {
       
  //     type: 'line', //this denotes tha type of chart
      
  //     data: {
  //       labels: ['2022-05-17', '2022-05-11', '2022-05-12','2022-05-13',
	// 							 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17','2022-05-19','2022-05-17'], 
	//        datasets: [
  //         {
  //           label: "",
  //           data: [ '9','8.5','9','9','9','8.7','9','8.2','9'],
  //                borderColor: '#0E9CFF',
  //                backgroundColor: '#9BD0F5',
  //                borderWidth:1.5
  //         } 
  //       ]
  //     },
  //     options: {
  //       title: {
  //         text: '',
  //         display: true
  //     },
  //     elements: {
  //       point:{
  //           radius: 0
  //       }
  //   },
  //     scales: {
  //       y: {
  //         grid: {
  //             drawBorder: false, // <-- this removes y-axis line
  //             lineWidth: 0.5,
  //         }
  //     },
  //         xAxes: [{
  //           display: false,
  //             ticks: {
  //                 display: false
  //             }
  //         }],
  //         yAxes: [{
  //           display: false,
  //           ticks: {
  //               display: false
  //           }
  //       }]
  //     },
     
  //     legend: {
  //         display: false
  //     }  
  //     }
      
  //   });
     
      
  // }
  // createChart3(){
  //   var ctx = document.getElementById('MyChart3');

  //   var stackedBar = new Chart(ctx, {
       
  //     type: 'line', //this denotes tha type of chart
      
  //     data: {
  //       labels: ['2022-05-17', '2022-05-11', '2022-05-12','2022-05-13',
	// 							 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17','2022-05-19','2022-05-17'], 
	//        datasets: [
  //         {
  //           label: "",
  //           data: [ '9','8.5','9','9','9','8.7','9','8.2','9'],
  //                borderColor: '#0E9CFF',
  //                backgroundColor: '#9BD0F5',
  //                borderWidth:1.5
  //         } 
  //       ]
  //     },
  //     options: {
  //       title: {
  //         text: '',
  //         display: true
  //     },
  //     elements: {
  //       point:{
  //           radius: 0
  //       }
  //   },
  //     scales: {
  //       y: {
  //         grid: {
  //             drawBorder: false, // <-- this removes y-axis line
  //             lineWidth: 0.5,
  //         }
  //     },
  //         xAxes: [{
  //           display: false,
  //             ticks: {
  //                 display: false
  //             }
  //         }],
  //         yAxes: [{
  //           display: false,
  //           ticks: {
  //               display: false
  //           }
  //       }]
  //     },
     
  //     legend: {
  //         display: false
  //     }  
  //     }
      
  //   });
     
      
  // }
  // createChart4(){
  //   var ctx = document.getElementById('MyChart4');

  //   var stackedBar = new Chart(ctx, {
       
  //     type: 'line', //this denotes tha type of chart
      
  //     data: {
  //       labels: ['2022-05-17', '2022-05-11', '2022-05-12','2022-05-13',
	// 							 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17','2022-05-19','2022-05-17'], 
	//        datasets: [
  //         {
  //           label: "",
  //           data: [ '9','8.5','9','9','9','8.7','9','8.2','9'],
  //                borderColor: '#0E9CFF',
  //                backgroundColor: '#9BD0F5',
  //                borderWidth:1.5
  //         } 
  //       ]
  //     },
  //     options: {
  //       title: {
  //         text: '',
  //         display: true
  //     },
  //     elements: {
  //       point:{
  //           radius: 0
  //       }
  //   },
  //     scales: {
  //       y: {
  //         grid: {
  //             drawBorder: false, // <-- this removes y-axis line
  //             lineWidth: 0.5,
  //         }
  //     },
  //         xAxes: [{
  //           display: false,
  //             ticks: {
  //                 display: false
  //             }
  //         }],
  //         yAxes: [{
  //           display: false,
  //           ticks: {
  //               display: false
  //           }
  //       }]
  //     },
     
  //     legend: {
  //         display: false
  //     }  
  //     }
      
  //   });
     
      
  // }
  // createChart5(){
  //   var ctx = document.getElementById('MyChart5');

  //   var stackedBar = new Chart(ctx, {
       
  //     type: 'line', //this denotes tha type of chart
      
  //     data: {
  //       labels: ['2022-05-17', '2022-05-11', '2022-05-12','2022-05-13',
	// 							 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17','2022-05-19','2022-05-17'], 
	//        datasets: [
  //         {
  //           label: "",
  //           data: [ '9','8.5','9','9','9','8.7','9','8.2','9'],
  //                borderColor: '#0E9CFF',
  //                backgroundColor: '#9BD0F5',
  //                borderWidth:1.5
  //         } 
  //       ]
  //     },
  //     options: {
  //       title: {
  //         text: '',
  //         display: true
  //     },
  //     elements: {
  //       point:{
  //           radius: 0
  //       }
  //   },
  //     scales: {
  //       y: {
  //         grid: {
  //             drawBorder: false, // <-- this removes y-axis line
  //             lineWidth: 0.5,
  //         }
  //     },
  //         xAxes: [{
  //           display: false,
  //             ticks: {
  //                 display: false
  //             }
  //         }],
  //         yAxes: [{
  //           display: false,
  //           ticks: {
  //               display: false
  //           }
  //       }]
  //     },
     
  //     legend: {
  //         display: false
  //     }  
  //     }
      
  //   });
     
      
  // }
  // createChart6(){
  //   var ctx = document.getElementById('MyChart6');

  //   var stackedBar = new Chart(ctx, {
       
  //     type: 'line', //this denotes tha type of chart
      
  //     data: {
  //       labels: ['2022-05-17', '2022-05-11', '2022-05-12','2022-05-13',
	// 							 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17','2022-05-19','2022-05-17'], 
	//        datasets: [
  //         {
  //           label: "",
  //           data: [ '9','8.5','9','9','9','8.7','9','8.2','9'],
  //                borderColor: '#0E9CFF',
  //                backgroundColor: '#9BD0F5',
  //                borderWidth:1.5
  //         } 
  //       ]
  //     },
  //     options: {
  //       title: {
  //         text: '',
  //         display: true
  //     },
  //     elements: {
  //       point:{
  //           radius: 0
  //       }
  //   },
  //     scales: {
  //       y: {
  //         grid: {
  //             drawBorder: false, // <-- this removes y-axis line
  //             lineWidth: 0.5,
  //         }
  //     },
  //         xAxes: [{
  //           display: false,
  //             ticks: {
  //                 display: false
  //             }
  //         }],
  //         yAxes: [{
  //           display: false,
  //           ticks: {
  //               display: false
  //           }
  //       }]
  //     },
     
  //     legend: {
  //         display: false
  //     }  
  //     }
      
  //   });
     
      
  // }
  

  ngOnInit() {
    this.getSelectedDashboard(this.service.customerType)
    // this.createChart();
    // this.createChart2();
    // this.createChart3();
    // this.createChart4();
    // this.createChart5();
    // this.createChart6();
    this.getCustomersData();
  }

  // getCustomersData(){
  //   this.service.getMycustomersList().subscribe((customer) =>{
  //     this.viewCustomersList=customer;
  //     console.log(this.viewCustomersList);
  //   });

  // }
  getSelectedDashboard(widgetName: any) {
    this.service.setCustomerType(widgetName);
    this.dashboardService.pageName = "dashboard";
    this.widgetPositions = [];
    this.dashboardService.widgetPositions = [];
    switch (this.service.customerType) { 
      case "corporate": {
        this.stackHolderName = "corporate";
        this.dashboardService.widgetPositions =
        this.dashboardService.corporate_Widget;
        this.widgetPositions = this.dashboardService.widgetPositions;
        break;      
      }
      case "healthcare": {
        this.stackHolderName = "healthcare";
        this.dashboardService.widgetPositions =
        this.dashboardService.corporate_Widget;
        this.widgetPositions = this.dashboardService.widgetPositions;
        break;
      }
      case "smallbusiness": {
        this.stackHolderName = "smallbusiness";
        this.dashboardService.widgetPositions =
        this.dashboardService.small_business_Widget;
        this.widgetPositions = this.dashboardService.widgetPositions;
        break;
      }
      case "food-beverages": {
        this.stackHolderName = "food-beverages";
        this.dashboardService.widgetPositions =
        this.dashboardService.corporate_Widget;
        this.widgetPositions = this.dashboardService.widgetPositions;
        break;
      }
      case "retail": {
        this.stackHolderName = "retail";
        this.dashboardService.widgetPositions =
        this.dashboardService.corporate_Widget;
        this.widgetPositions = this.dashboardService.widgetPositions;
        break;
      }
      case "insurance": {
        this.stackHolderName = "insurance";
        this.dashboardService.widgetPositions =
        this.dashboardService.corporate_Widget;
        this.widgetPositions = this.dashboardService.widgetPositions;
        break;
      }
      case "technology": {
        this.stackHolderName = "technology";
        this.dashboardService.widgetPositions =
        this.dashboardService.corporate_Widget;
        this.widgetPositions = this.dashboardService.widgetPositions;
        break;
      }
      case "petroleum": {
        this.stackHolderName = "petroleum";
        this.dashboardService.widgetPositions =
        this.dashboardService.corporate_Widget;
        this.widgetPositions = this.dashboardService.widgetPositions;
        break;
      } 
      case "transportation": {
        this.stackHolderName = "transportation";
        this.dashboardService.widgetPositions =
        this.dashboardService.corporate_Widget;
        this.widgetPositions = this.dashboardService.widgetPositions;
        break;
      }
      case "automotive": {
        this.stackHolderName = "automotive";
        this.dashboardService.widgetPositions =
        this.dashboardService.corporate_Widget;
        this.widgetPositions = this.dashboardService.widgetPositions;
        break;
      }  
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


  //get data from customer-list
  getCustomersData() {
    let customerData = sessionStorage.getItem("customersDetails");
    this.getMonth()
    // if (customerData != null) {
    //   this.viewCustomersList = JSON.parse(customerData);
    //   this.service.saveCustomerDetails(this.viewCustomersList);
    // } else {
      this.service.getMycustomersList().subscribe((customer) => {
        customer.forEach((customerVal) => {
          let findHighestValue = [];
          let changeName = customerVal.customer_name.replace(
            / *\([^)]*\) */g,
            ""
          );
          customerVal.customer_name = changeName;
          let dateValue = customerVal.customer_created_date.toString();
          let year = dateValue.substr(0, 4);
          let month = dateValue.substr(4, 2);
          let date = dateValue.substr(6, 2);
          customerVal.tenure = this.currentYear - Number(year);

          customerVal.createdDate = date + "/" + month + "/" + year;

          let customerValp12: any;
          if (customerVal.P12Tm != "NULL") {
            customerValp12 = customerVal.P12Tm;
            findHighestValue.push(customerValp12);
          } else {
            customerValp12 = 0;
            findHighestValue.push(customerValp12);
          }
          customerVal.P12Tm = customerValp12;

          if (customerVal.customer_last_invoice_date != 0) {
            let dateValue1 = customerVal.customer_last_invoice_date.toString();
            let year1 = dateValue.substr(0, 4);
            let month1 = dateValue.substr(4, 2);
            let date1 = dateValue.substr(6, 2);

            customerVal.invoiceDate = date1 + "/" + month + "/" + year;
          } else {
            customerVal.invoiceDate = "01/01/1992";
          }
          let changeMoney = this.convertNumber(
            customerVal.it_expenditure_potential
          );
          customerVal.expenditurePotential = changeMoney;

          let percentageForcaptured =
            customerVal.it_expenditure_potential -
            customerVal.expenditure_captured;
          if (percentageForcaptured == 0) {
            customerVal.capturedPercentage = "0";
          } else {
            let changePercentcaptured =
              (percentageForcaptured / customerVal.it_expenditure_potential) *
              100;
            customerVal.capturedPercentage = changePercentcaptured
              .toFixed(2)
              .toString();
          }

          let customerValC12: any;
          if (customerVal.C12TM != "NULL") {
            customerValC12 = customerVal.C12TM;
            customerVal.customerC12 = this.convertNumber(customerVal.C12TM);
            findHighestValue.push(customerVal.C12TM);
          } else {
            customerValC12 = 0;
            customerVal.customerC12 = customerValC12;
            findHighestValue.push(customerValC12);
          }
          customerVal.avgspend = this.convertNumber(customerValC12 / 12);
          customerVal.C12TM = customerValC12;

          let customerValpp12: any;
          if (customerVal.PP12TM != "NULL") {
            customerValpp12 = customerVal.PP12TM;
            findHighestValue.push(customerValpp12);
          } else {
            customerValpp12 = 0;
            findHighestValue.push(customerValpp12);
          }
          customerVal.PP12TM = customerValpp12;

          let maxValue = Math.max.apply(null, findHighestValue);

          if (customerVal.P12Tm != 0) {
            customerVal.P12TmProgress = (customerVal.P12Tm / maxValue) * 100;
          } else {
            customerVal.P12TmProgress = 0;
          }

          if (customerVal.C12TM != 0) {
            customerVal.C12TMProgress = (customerVal.C12TM / maxValue) * 100;
          } else {
            customerVal.C12TMProgress = 0;
          }

          if (customerVal.PP12TM != 0) {
            customerVal.PP12TMProgress = (customerVal.PP12TM / maxValue) * 100;
          } else {
            customerVal.PP12TMProgress = 0;
          }
        });

        customer.sort((a, b) => {
          if (a.C12TM > b.C12TM ) return -1;
          else if (a.C12TM  < b.C12TM ) return 1;
          else return 0;
        });
        sessionStorage.setItem("customersDetails", JSON.stringify(customer));
        this.viewCustomersList = customer;
        this.service.saveCustomerDetails(this.viewCustomersList);
      });
      this.sortingInsightsData();
    // }
  }
  covertToMillion(num: any) {
    return (num / 1000000).toFixed(2);
  }
  convertNumbertoInteger(num: any) {
    let val = NaN;
    if (num != Infinity && isNaN(num) === false) {
      return num.toFixed(0).toLocaleString() + " %";
    } else {
      return (num = "0" + " %");
    }
  }
 
 
  month: any; 
  getMonth() { 
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]; 
  this.month = new Date(); 
  this.month = months[this.month.getMonth()]; 
}
convertNumber(num: any) {
  if (num != "" && num != "NULL") {
    // Alter numbers larger than 1k
    if (num >= 1e3) {
      var units = ["K", "M", "B", "T"];

      var order = Math.floor(Math.log(num) / Math.log(1000));

      var unitname = units[order - 1];
      var num1 = (num / 1000 ** order).toFixed(2);

      // output number remainder + unitname
      return num1 + unitname;
    }
    // return formatted original number
    return num.toFixed(2).toLocaleString();
  } else {
    return (num = "0");
  }
}

exploreCustomersList(event: boolean) {
  this.customersList$ = this.service.customers$;
  this.total$ = this.service.total$;
}
selectedCustomer(customers: MycustomersDetails) {
  this.router.navigate(["/customer" + "/" + customers.CustomerCode]);
  this.service.sendGroupName("ACCOUNTS");
}
  // findFundingfile() {
  //   this.service.findFundingJson().subscribe((fund: any) => {
  //      this.fundJsonfile = true;
  //   }, (error => {
  //      this.fundJsonfile = false;
  //   }));
  // }
}
