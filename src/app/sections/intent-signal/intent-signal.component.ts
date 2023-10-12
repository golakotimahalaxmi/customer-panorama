import { Component, Input, OnInit } from '@angular/core';
import { Recommandation } from 'src/app/classesList/customer';
import { CustomerService } from 'src/app/services/customerService';
import { DashboardService } from 'src/app/services/dashboardService';
import { IntentService } from 'src/app/services/intent.service';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-intent-signal',
  templateUrl: './intent-signal.component.html',
  styleUrls: ['./intent-signal.component.css']
})
export class IntentSignalComponent implements OnInit {

  @Input() isFull: boolean;
  @Input() widget2: string;
 

  modalName: string;
  allHeadings: any = {};
  recommandations: Recommandation[] = [];
  intentData:any[]=[];
  public screenHeight:number;

  constructor(private modalService: ModalService, 
    private dashboardService: DashboardService, 
    private service: CustomerService,
    ) {
    
  }

  ngOnInit() {
    this.getData();
    this.getAllHedings();
  }
  // method used for open the widget into modal popup to show entire data.
  openModal() {
    console.log(this.modalName);
    this.modalService.open(this.modalName);
    
   }
  closeModal() {
    this.modalService.close(this.modalName);
  }

  getAllHedings() {
    this.dashboardService.getAllheadings().subscribe((headings: any) => {
        this.allHeadings = headings;
        this.modalName = this.allHeadings.intentId;
        this.dashboardService.subscribeAllheadings(headings);
      })
  }
  getData()
  {
    this.service.getIntentData().subscribe((res) => {
      this.intentData = res;
    }); 
  } 

}
