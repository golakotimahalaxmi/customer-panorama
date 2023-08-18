import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from '../_modal';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Chart } from 'chart.js';
import { MycustomersDetails, Partnerslist, Firmographics, Customerfinanical, SimilarCompany, AccountManager_locations } from 'src/app/classesList/customer';
import { CustomerService } from 'src/app/services/customerService';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboardService';
import { DomSanitizer} from '@angular/platform-browser'

@Component({
  selector: 'app-customer-identity',
  templateUrl: './customer-identity.component.html',
  styleUrls: ['./customer-identity.component.css']
})
export class CustomerIdentityComponent implements OnInit, OnDestroy {

  modalName: string;
  topCompetatorsArray = [];
  topCompetatorsprospects = [];
  countriesList = [];
  countriesNames = [];
  similarCompanies: SimilarCompany[] = []
  customerIdentity: MycustomersDetails;
  singleCustomerpartnersList: Partnerslist[] = [];
  evenPartnerList: Partnerslist[] = [];
  oddPartnerList: Partnerslist[] = [];
  cardTitle : string;
  firmoGraphData: Firmographics[] = [];
  managers: AccountManager_locations[] = [];
  emittedObservableValue: Subscription;
  getAllheadings: any;
  fetchCustmerId: string;
  stackedBar: any;
  similarStackedbargraph: any;
  show:boolean = false;
  expendedShow:boolean = false;
  rupeeValue: string;
  currentYear:number = new Date().getFullYear()-1;
  PreviousYear:number = new Date().getFullYear()-2;
  PerviousMinus2:number = new Date().getFullYear()-3;
  highestValue: number
  expandedviewOpended:boolean = false;
  storedCustomerID: string;


  constructor(private dashboardService: DashboardService, private modalService: ModalService, private service: CustomerService, private router: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.getAllHedingsData();
    this.customerIdentity;
    this.firmoGraphData;
    this.customerIdentity = new MycustomersDetails();
    this.sanitizer = sanitizer; 
}

  ngOnInit() {
    let id = sessionStorage.getItem('customerID');
    if(id != null) {
      this.storedCustomerID = id;
     }
    let customerCode: string
    this.router.paramMap.subscribe((params : ParamMap) => {
      customerCode = params.get('id');
      this.service.storeCustomerCode(customerCode);
      sessionStorage.setItem('customerID', customerCode);
    })
    
    this.emittedObservableValue = this.service.sendedData.subscribe(changedCustomerCode => {
        if(changedCustomerCode != '' && changedCustomerCode != this.service.existedCustomerCode) {
           this.fetchCustmerId = changedCustomerCode;
           this.getParticularCustomerdetails(changedCustomerCode);
           } else {
          this.fetchCustmerId = customerCode;
          this.getParticularCustomerdetails(customerCode);    
             
        }
        
   });    
   }

   // method for getAllHeadings
  getAllHedingsData() {
    if(this.dashboardService.storeAllheadings != undefined) {
      this.getAllheadings = this.dashboardService.storeAllheadings;
      this.modalName = this.getAllheadings.customerIdentityid;
    } else {
       let data = sessionStorage.getItem('headingsData');
       this.getAllheadings = JSON.parse(data);
       this.modalName = this.getAllheadings.customerIdentityid;
    }
  }

  // method for creating financial graph
  getFinancialGraph(id: string){
    
     let finaceData = sessionStorage.getItem('finanicalDetails');
     
     if(finaceData != null) {
      this.calculateFinacialChart(JSON.parse(finaceData), id);
     } else {
      this.service.getFinanicalData().subscribe(finanical => {
        sessionStorage.setItem('finanicalDetails', JSON.stringify(finanical));
        this.calculateFinacialChart(finanical, id);
       });
      }
  }
    

// method for calculating finanical data
calculateFinacialChart(finanical: any, id: string) {
  let C12TMArray = [];
    let P12TM = [];
    let PP12TM = [];
    let separateP12TM = [];
    let separatePP12TM = [];
    let customerFinanicalArray = [];
    let labels = [];
    let C12Values: any;
    let P12Values: any;
    let PP12Values: any;

  finanical.forEach(customerFinanicalData => {
    if(customerFinanicalData.CustomerCode === parseInt(id)) {
        customerFinanicalArray.push(customerFinanicalData);
     }
 })

customerFinanicalArray.map(C12TM  =>  {
    if(C12TM.PeriodType === "C12TM") {
        C12TMArray.push(C12TM);
        } else if(C12TM.PeriodType === "P12TM") {
      separateP12TM.push(C12TM);
      } else if(C12TM.PeriodType === "PP12TM") {
      separatePP12TM.push(C12TM);
     }
});

// code for calculating totalgross for PP12TM..

let PP12TMCompleteArray = [];
for(let i = 0; i < separatePP12TM.length; i++) {
 let TotalPP12TMCompleteArray = separatePP12TM.filter(x => (x.ItemTypeDescription === separatePP12TM[i].ItemTypeDescription));

 let grand = []

  if(TotalPP12TMCompleteArray.length === 0) {
      let lengthCount = TotalPP12TMCompleteArray.length;
   TotalPP12TMCompleteArray.map((countArray, index) => {
      grand.push(countArray.GrossSales);
       if(lengthCount === (index+1)) {
        countArray.GrossSalesTotal = grand.reduce((a, b) => a + b)
      } else {
        countArray.GrossSalesTotal = 0;
      }
       PP12TMCompleteArray.push(countArray);
      })
      
    } 
   else {
     let arrayCount =   PP12TMCompleteArray.filter(count => count.ItemTypeDescription === separatePP12TM[i].ItemTypeDescription);
     if(arrayCount.length === 0) {
        let lengthCount = TotalPP12TMCompleteArray.length;
        TotalPP12TMCompleteArray.map((countArray, index) => {
            grand.push(countArray.GrossSales);
            if(lengthCount === (index+1)) {
                countArray.GrossSalesTotal = grand.reduce((a, b) => a + b)
              } else {
                countArray.GrossSalesTotal = 0;
              }
            PP12TMCompleteArray.push(countArray);
          })
     } 
   }
}


// code for calculating totalgross for C12TM..
let C12TMCompleteArray = [];
for(let i = 0; i < C12TMArray.length; i++) {
 let TotalC12TMCompleteArray = C12TMArray.filter(x => (x.ItemTypeDescription === C12TMArray[i].ItemTypeDescription));

 let grand = []

  if(TotalC12TMCompleteArray.length === 0) {
      let lengthCount = TotalC12TMCompleteArray.length;
   TotalC12TMCompleteArray.map((countArray, index) => {
      grand.push(countArray.GrossSales);
       if(lengthCount === (index+1)) {
        countArray.GrossSalesTotal = grand.reduce((a, b) => a + b)
      } else {
        countArray.GrossSalesTotal = 0;
      }
       C12TMCompleteArray.push(countArray);
      })
      
    } 
   else {
     let arrayCount =   C12TMCompleteArray.filter(count => count.ItemTypeDescription === C12TMArray[i].ItemTypeDescription);
     if(arrayCount.length === 0) {
        let lengthCount = TotalC12TMCompleteArray.length;
        TotalC12TMCompleteArray.map((countArray, index) => {
            grand.push(countArray.GrossSales);
            if(lengthCount === (index+1)) {
                countArray.GrossSalesTotal = grand.reduce((a, b) => a + b)
              } else {
                countArray.GrossSalesTotal = 0;
              }
            C12TMCompleteArray.push(countArray);
          })
     } 
   }
}


  // code for calculating totalgross for C12TM..
  let P12TMCompleteArray = [];
  for(let i = 0; i < separateP12TM.length; i++) {
    let TotalP12TMCompleteArray = separateP12TM.filter(x => (x.ItemTypeDescription === separateP12TM[i].ItemTypeDescription));
 
    let grand = []

     if(TotalP12TMCompleteArray.length === 0) {
         let lengthCount = TotalP12TMCompleteArray.length;
      TotalP12TMCompleteArray.map((countArray, index) => {
         grand.push(countArray.GrossSales);
          if(lengthCount === (index+1)) {
           countArray.GrossSalesTotal = grand.reduce((a, b) => a + b)
         } else {
           countArray.GrossSalesTotal = 0;
         }
         P12TMCompleteArray.push(countArray);
        
         })
         
       } 
      else {
        let arrayCount =   P12TMCompleteArray.filter(count => count.ItemTypeDescription === separateP12TM[i].ItemTypeDescription);
        if(arrayCount.length === 0) {
           let lengthCount = TotalP12TMCompleteArray.length;
           TotalP12TMCompleteArray.map((countArray, index) => {
               grand.push(countArray.GrossSales);
               if(lengthCount === (index+1)) {
                   countArray.GrossSalesTotal = grand.reduce((a, b) => a + b)
                 } else {
                   countArray.GrossSalesTotal = 0;
                 }
               P12TMCompleteArray.push(countArray);
               
             })
        } 
      }
   }

   

   let C12TMdata = C12TMCompleteArray.filter(c12 => c12.GrossSalesTotal != 0);
   let P12TMData = P12TMCompleteArray.filter(p12 => p12.GrossSalesTotal != 0);
   let PP12TMData = PP12TMCompleteArray.filter(pp12 => pp12.GrossSalesTotal != 0);

   let c12Data = C12TMdata.sort((a,b) => parseFloat(b.GrossSalesTotal) - parseFloat(a.GrossSalesTotal)).slice(0,5);
   let P12Data = P12TMData.sort((a,b) => parseFloat(b.GrossSalesTotal) - parseFloat(a.GrossSalesTotal)).slice(0,5);
   let PP12Data = PP12TMData.sort((a,b) => parseFloat(b.GrossSalesTotal) - parseFloat(a.GrossSalesTotal)).slice(0,5);
 
   let finalC12Data = [];


   let P12finalData = [];
   let P122finalData = [];
   c12Data.forEach(val => {
    let name = val.ItemTypeDescription;
    let namesLen = name.split('(');
    let code = namesLen[1].split(')');
    let cahrtLabelName =  code[0];
    labels.push(cahrtLabelName);

    finalC12Data.push(val.GrossSalesTotal);

    P12Data.map(p12 => {
      if(p12.ItemTypeDescription === val.ItemTypeDescription) {
        P12finalData.push(p12.GrossSalesTotal);
      }
    })

    PP12Data.map(p12 => {
      if(p12.ItemTypeDescription === val.ItemTypeDescription) {
        P122finalData.push(p12.GrossSalesTotal);
      }
    })
  })

  let findHighestValue = [...finalC12Data, ...P12finalData, ...P122finalData];

  let highestValue = Math.max.apply(null, findHighestValue);
  let typeOfNumber = this.convertNumber(highestValue);

  let C12finalValue = [];
  let P12finalValue = [];
  let PP12finalValue = [];

  if(typeOfNumber.endsWith('M') || typeOfNumber.endsWith('B') || typeOfNumber.endsWith('T')) {
      this.rupeeValue = 'M';
      finalC12Data.forEach(val => {
         let million = this.convertTorupees(val);
         C12finalValue.push(million);
      })

      P12finalData.forEach(val => {
        let million = this.convertTorupees(val);
        P12finalValue.push(million);
     })

     P122finalData.forEach(val => {
      let million = this.convertTorupees(val);
      PP12finalValue.push(million);
   })
  } 
  else if(typeOfNumber.endsWith('K')) {

    this.rupeeValue = 'K';
    finalC12Data.forEach(val => {
       let million = this.convertTorupees(val);
       C12finalValue.push(million);
    })

    P12finalData.forEach(val => {
      let million = this.convertTorupees(val);
      P12finalValue.push(million);
   })

   P122finalData.forEach(val => {
    let million = this.convertTorupees(val);
    PP12finalValue.push(million);
 })
  }

  this.showBarChartForCustomers(C12finalValue, P12finalValue, PP12finalValue, labels)
}

convertTorupees(rupeeVal: any) {
  if(this.rupeeValue === 'M') {
    return (rupeeVal / 1000000).toFixed(2).replace(/\.0$/, '')
  } else if(this.rupeeValue === 'K') {
    return (rupeeVal / 1000).toFixed(2).replace(/\.0$/, '')
  } else if(this.rupeeValue === 'B') {
    return (rupeeVal / 1000000000).toFixed(2).replace(/\.0$/, '')
  } else if(this.rupeeValue === 'T') {
    return (rupeeVal / 1000000000000).toFixed(2).replace(/\.0$/, '')
  }
}



convertNumber(num:any) {

  if(num != undefined) {
     // Alter numbers larger than 1k
  if (num >= 1e3) {
    var units = ["K", "M", "B", "T"];
    
    var order = Math.floor(Math.log(num) / Math.log(1000));

    var unitname = units[(order - 1)];
    var num1 = (num / 1000 ** order).toFixed(2);
    
    // output number remainder + unitname
    return num1 + unitname
  }
  
  // return formatted original number
  return num.toFixed(2).toLocaleString();
  }
 
}

roundToTwo(num) {    
  if(Math.round(num) === 0)
    return 1;
  else
    return Math.round(num)
}

// method for creating the array blist for bar chart
showBarChartForCustomers(C12: any, P12: any, PP12: any, labels: any) { 
  if(this.stackedBar != undefined || this.stackedBar) {
      this.stackedBar.destroy();
    }

    var ctx = document.getElementById('financials');    

    this.stackedBar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
            {
                label: this.currentYear,
                data: C12,
                backgroundColor: '#007199',
            },
            {
                label: this.PreviousYear,
                data: P12,
                backgroundColor: '#F5B428',
            },
            {
                label: this.PerviousMinus2,
                data: PP12,
                backgroundColor: '#009383',
            }
            ]
        },
        options: {
            scales: {
                xAxes: [{
                    gridLines:{
                        display: true
                    },
                    stacked: false
                }],
                yAxes: [{
                    gridLines:{
                        display: false
                    },
                    stacked: false
                }]
            },
            legend: {
                display: true
            }
        }
    });
}
  
getSimilarCompaniesGraph(){
    if(this.similarStackedbargraph != undefined) {
      this.similarStackedbargraph.destroy();
    }
    var ctx = document.getElementById('similarCompanies');

    this.similarStackedbargraph = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Laptop','Server','Cables','Softwares','NetComm'],
            datasets: [
                {
                    label: this.similarCompanies[0].SimilarCompany1_Name,
                    data: [67.8,70,68,85,40],
                    backgroundColor: '#007199',
                },
                {
                    label: this.similarCompanies[0].SimilarCompany2_Name,
                    data: [20.7,20,10,10,20],
                    backgroundColor: '#F5B428',
                },
                {
                    label: this.similarCompanies[0].SimilarCompany3_Name,
                    data: [11.4,10,22,5,40],
                    backgroundColor: '#009383',
                }
            ]
        },
        options: {
            scales: {
                xAxes: [{
                    gridLines:{
                        display: true
                    },
                    stacked: false
                }],
                yAxes: [{
                    gridLines:{
                        display: false
                    },
                    stacked: false
                }]
            },
            legend: {
                //position:'bottom',
                display: true
            }
        }
    });
  }


  // method for fetching data of particular customer clicked on mycustomer component based on customer_code
  getParticularCustomerdetails(id: string) {
    let allCustomers = sessionStorage.getItem('customersDetails');
    if(allCustomers != null) {
      let customersList = JSON.parse(allCustomers);
      customersList.forEach(particularCustomer => {
          if(particularCustomer.CustomerCode === parseInt(id)) {
         particularCustomer.totalCalls = (particularCustomer.inbound_calls + particularCustomer.outbound_calls);
         particularCustomer.totalemails = (particularCustomer.inbound_emails + particularCustomer.outbound_emails);
         particularCustomer.callsPercent = (particularCustomer.inbound_calls/particularCustomer.totalCalls)*100;
         particularCustomer.emailsPercent = (particularCustomer.inbound_emails/particularCustomer.totalemails)*100;
        //  console.log(particularCustomer);
         let findHighestValue = [];
         let changeName = particularCustomer.customer_name.replace(/ *\([^)]*\) */g, "");
         particularCustomer.customer_name = changeName;

         let coWorkerName = particularCustomer.CoworkerName.replace(/ *\([^)]*\) */g, "");
         particularCustomer.CoworkerName = coWorkerName;

         let changeMoney = this.convertNumber(particularCustomer.it_expenditure_potential);
         particularCustomer.expenditurePotential = '$'+''+ changeMoney;
         

         let removeCharacter;
         let value;
         value = this.removeCharater(changeMoney);
        
        
         let particualrExp = this.convertNumber(particularCustomer.expenditure_captured);
         let particualrExpfinalval;
         particualrExpfinalval = this.removeCharater(particualrExp);

        let percentageForcaptured = (particularCustomer.it_expenditure_potential - particularCustomer.expenditure_captured)
         if(percentageForcaptured == 0) {  
           particularCustomer.capturedPercentage = '0';
         } else {
          let changePercentcaptured = percentageForcaptured/particularCustomer.it_expenditure_potential*100; 
          particularCustomer.capturedPercentage = changePercentcaptured.toFixed(2).toString();
         }


           if(particularCustomer.P12Tm>particularCustomer.C12TM && particularCustomer.P12Tm>particularCustomer.PP12TM)
           {
              this.highestValue = particularCustomer.P12Tm;
            }
           else if(particularCustomer.C12TM>particularCustomer.P12Tm && particularCustomer.C12TM>particularCustomer.PP12TM)
           {
             this.highestValue = particularCustomer.C12TM;
           }
           else if(particularCustomer.PP12TM>particularCustomer.C12TM && particularCustomer.PP12TM>particularCustomer.P12Tm)
           {
             this.highestValue = particularCustomer.PP12TM;
           }

           this.getPartnersForparticularcustomer(id);
           this.getfirmographicsData(id);

        this.customerIdentity = particularCustomer;

     }
    })
    } 
   }

  removeCharater(val: string) {
    if(val.includes('M') === true) {
      let removeChar = val.search('M');
      return val.substring(0, removeChar);
    } else if(val.includes('K') === true) {
      let removeChar = val.search('K');
      return val.substring(0, removeChar);
    } else if(val.includes('T') === true) {
      let removeChar = val.search('T');
      return val.substring(0, removeChar);
    } else if(val.includes('B') === true) {
      let removeChar = val.search('B');
      return val.substring(0, removeChar);
    }
  }

  // method for all calling the funds data for particular customer

  getfirmographicsData(id: string) {
     this.firmoGraphData = [];
     this.countriesList = [];
     this.countriesNames = [];
     this.topCompetatorsArray.length = 0;
     this.topCompetatorsprospects.length = 0;
     this.topCompetatorsArray.length = 0;
     this.topCompetatorsprospects.length = 0;
     let firmoDetais = sessionStorage.getItem('firmoData');
     if(firmoDetais != null) {
         let dataOfFunding = JSON.parse(firmoDetais).filter(firmoGraphicData => firmoGraphicData.customer_code === parseInt(id));
         this.particularCustomerfirmograph(dataOfFunding, id); 
        } else {
          this.service.getAllfirmographics().subscribe(firmo => {
            sessionStorage.setItem('firmoData', JSON.stringify(firmo));
           let dataOfFunding = firmo.filter(firmoGraphicData => firmoGraphicData.customer_code === parseInt(id));
           this.particularCustomerfirmograph(dataOfFunding, id); 
           })
        }
       }

       // method for exicuteing particular customer firmograph

       particularCustomerfirmograph(dataOfFunding: any, id: string) {
        if(dataOfFunding.length != 0) {
          // let changeMoney = (dataOfFunding[0].Total_Funding_Amount/1000000).toFixed(1).replace(/\.0$/, '');
          // dataOfFunding[0].Total_Funding_Amount = parseInt(changeMoney);
          let comptetors = dataOfFunding[0].top_competitors_existing.split(';');
          comptetors.map((val, index) => {
            this.topCompetatorsArray.push(val);
          });
          let prospects = dataOfFunding[0].top_competitors_prospects.split(';');
          prospects.map((val, index) => {
            this.topCompetatorsprospects.push(val);
          });
          
          let countries = dataOfFunding[0].country_logo.split(';');
          countries.forEach((val, index)=> {
              if(val != '') {
                this.countriesList.push(val.trim());
              }
          })

          let countriesName = dataOfFunding[0].country.split(';');
          countriesName.forEach((val, index)=> {
            if(val != '') {
              this.countriesNames.push(val.trim());
            }
            
        })
        this.firmoGraphData = dataOfFunding;
        this.getSimilarcompaniesdata(id);
        this.getMangersdata(id);
        this.showGooglemapforparticlarcoustomer();
       }
       }

   // method for getting the similar companies
   getSimilarcompaniesdata(id: string) {
    this.similarCompanies = [];
    let companyData = [];
     let similarCompanysData = sessionStorage.getItem('similarCompanyDetails')
     if(similarCompanysData != null) {
       companyData = JSON.parse(similarCompanysData).filter(similarCompany => similarCompany.CustomerCode === parseInt(id));
       this.similarCompaniesforparticularcustomer(companyData);
      } 
     else {
       this.service.getAllsimilarCompanieslist().subscribe(similar => {
         sessionStorage.setItem('similarCompanyDetails', JSON.stringify(similar));
           companyData = similar.filter(similarCompany => similarCompany.CustomerCode === parseInt(id));
           this.similarCompaniesforparticularcustomer(companyData);
         })
     }
    }

    // method for similarcompanies for particular customerId
    similarCompaniesforparticularcustomer(companyData: any) {
      if(companyData.length != 0) { 
        this.similarCompanies = companyData;
        this.getSimilarCompaniesGraph();
       }
    }

   // method for get managers data 
   getMangersdata(id: string) {
    let account_manager = [];
    let managerDetails = sessionStorage.getItem('managers');
    if(managerDetails != null) {
       account_manager = JSON.parse(managerDetails).filter(firmoGraphicData => firmoGraphicData.customer_code === parseInt(id));
       this.particularCustomermanagerslist(account_manager);
   }
   else {
        this.service.getAccountManager_locations().subscribe(accountManagers => {
          sessionStorage.setItem('managers', JSON.stringify(accountManagers));
          account_manager = accountManagers.filter(firmoGraphicData => firmoGraphicData.customer_code === parseInt(id));
          this.particularCustomermanagerslist(account_manager);
         });
   }
}

// method for calling patners for particular customer manager list
particularCustomermanagerslist(account_manager: any) {
  this.managers = [];
  if(account_manager.length != 0) {
    account_manager.forEach(particularManager => {
      particularManager.totalCalls = (particularManager.inbound_calls + particularManager.outbound_calls);
      particularManager.totalemails = (particularManager.inbound_emails + particularManager.outbound_emails);
      particularManager.callsPercent = (particularManager.inbound_calls/particularManager.totalCalls)*100;
      particularManager.emailsPercent = (particularManager.inbound_emails/particularManager.totalemails)*100;
    })
   
    this.managers = account_manager;
   }
}

    // method for google map
    showGooglemapforparticlarcoustomer() {
       let map = document.getElementById('gmap_canvas');
       map.setAttribute('src', '');
       map.removeAttribute('src');
       let area = this.firmoGraphData[0].headquarters.split(',');
       let placeName = area[0].trim()+'+'+area[1].trim();
       let mapUrl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyCIFfDkOfXFrHKgPzy3-peNkH8jqv-bpwM&q='+placeName;
       map.setAttribute('src', mapUrl);
    } 


  // method for calling patners for particular customer
  getPartnersForparticularcustomer(id: string) {
    this.singleCustomerpartnersList.length = 0;
    let partnerData = sessionStorage.getItem('partners');
    if(partnerData != null) {
         JSON.parse(partnerData).forEach(customerPartner => {
            if(customerPartner.CustomerCode === parseInt(id)) {
              this.singleCustomerpartnersList.push(customerPartner);
             }
           })
           this.partnersListforparticularcompany();
      } else {
          this.service.getAllpartnerslist().subscribe(partner => {
            sessionStorage.setItem('partners', JSON.stringify(partner));
            partner.forEach(customerPartner => {
              if(customerPartner.CustomerCode === parseInt(id)) {
                 this.singleCustomerpartnersList.push(customerPartner);
                }
            })
            this.partnersListforparticularcompany();
           });
        
     }
 }

 // method for partnersList for companies 
 partnersListforparticularcompany() {
  this.evenPartnerList.length = 0;
  this.oddPartnerList.length = 0;
  if(this.singleCustomerpartnersList.length != 0) {
    for(let i=0; i < this.singleCustomerpartnersList.length; i++) {
     if(i%2 == 0) {
       this.evenPartnerList.push(this.singleCustomerpartnersList[i]);
      } else {
        this.oddPartnerList.push(this.singleCustomerpartnersList[i])
      }
    }
  }
 }
  // method used for open the widget into modal popup to show entire data.
  openModal() {
    this.modalService.open(this.modalName);
    this.getFinancialGraph(this.fetchCustmerId);
    this.showGooglemapforparticlarcoustomer();
   }

   // method for closing the widget
 closeModal() {
    this.modalService.close(this.modalName);
  }

  ngOnDestroy() {
      this.emittedObservableValue.unsubscribe();
  }

  transform(url: string) {
    if(!url) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
