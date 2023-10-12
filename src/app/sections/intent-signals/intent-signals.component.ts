import { Component, Input, OnInit } from '@angular/core';
import { Recommandation } from 'src/app/classesList/customer';
import { CustomerService } from 'src/app/services/customerService';
import { DashboardService } from 'src/app/services/dashboardService';
import { ModalService } from '../_modal';
import { IntentService } from 'src/app/services/intent.service';

@Component({
  selector: 'app-intent-signals',
  templateUrl: './intent-signals.component.html',
  styleUrls: ['./intent-signals.component.css']
})
export class IntentSignalsComponent implements OnInit {

  @Input() isFull: boolean;
  @Input() widget2: boolean;
  
  modalName: string;
  getAllheadings: any = {};
  recommandations: Recommandation[] = [];
  intentData:any[]=[];
  public screenHeight:number;

  constructor(private modalService: ModalService, private dashboardService: DashboardService, private service: CustomerService,private intentService:IntentService) {
    this.getAllHedings();
    this.getAllrecommandations();
    
  }

  ngOnInit() {
   this.getData();
    console.log(this.intentData);
    
  }

  // method for getAllrecommandations

  getAllrecommandations() {
    this.service.getRecommandation().subscribe(recommandation => {
      recommandation.forEach(recommandationVal => {
        let totalValue = (recommandationVal.total_value/1000).toFixed(2);
        recommandationVal.total_value = parseInt(totalValue);
        let productValue = (parseInt(recommandationVal.product_value)/1000).toFixed(2);
        recommandationVal.product_value = productValue;
      })
      recommandation=recommandation.sort(function(a, b) {
        if (a.probability > b.probability) return -1;
        else if (a.probability < b.probability) return 1;
        else return 0;
    });
      this.recommandations = recommandation;
    });
  }

    // method for getAllHeadings
    getAllHedings() {
     if(this.dashboardService.storeAllheadings != undefined) {
        this.getAllheadings = this.dashboardService.storeAllheadings;
        this.modalName = this.getAllheadings.intentId;
      } else {
         let data = sessionStorage.getItem('headingsData');
         this.getAllheadings = JSON.parse(data);
          this.modalName = this.getAllheadings.intentId;
      }

    }

  // method used for open the widget into modal popup to show entire data.
  openModal() {
    console.log(this.modalName);
    this.modalService.open(this.modalName);
   }
  closeModal() {
    this.modalService.close(this.modalName);
  }
  getData()
  {
    this.intentService.getIntentData().subscribe((res) => {
      this.intentData = res;
    });
  }

}
