import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../_modal';
import { DashboardService } from 'src/app/services/dashboardService';
import { widget } from 'src/app/classesList/customer';


@Component({
  selector: 'app-widget-menu',
  templateUrl: './widget-menu.component.html',
  styleUrls: ['./widget-menu.component.css']
})
export class WidgetMenuComponent implements OnInit {

  @Input() modalName: string;
  @Output() exploreCustomersList: EventEmitter<boolean> = new EventEmitter<boolean>();

  expandDisabled:string[]=['newsalerts','customerEvents','funding'];
  removeEnabled:string[]=['newsalerts','customerEvents',"customerMenu",'funding'];
  constructor(private modalService: ModalService, private dashboardService: DashboardService) {  }

  ngOnInit() {
  }

  isExpandable(widget:string){
    if(widget === this.expandDisabled[0] || widget === this.expandDisabled[1] || widget === this.expandDisabled[2]){
      return false;
    }
    return true;
  }

  isRemovable(widget:string){
    if(widget === this.removeEnabled[0] || widget === this.removeEnabled[1] || widget === this.removeEnabled[2] || widget === this.removeEnabled[3]){
      return true;
    }
    return false;
  }

  openModal() {
    if(this.modalName === 'customerMenu') {
       this.exploreCustomersList.emit(true);
    }
    this.modalService.open(this.modalName);
  }

  closeModal() {
    this.modalService.close(this.modalName);
  }

  removeWidget(){
    let widgets = this.dashboardService.widgetPositions
    if(widgets.length>1 || widgets[0].widget2 != ''){
      let itemIndex = widgets.findIndex(widget => widget.name === this.modalName);
      if(itemIndex >= 0)
      {
        if(widgets[itemIndex].isFull){
          widgets.splice(itemIndex,1);
          if(itemIndex === widgets.length)
            widgets[itemIndex-1].size = 4 - widgets.length;
          else
            widgets[itemIndex].size = 4 - widgets.length;
        }
        else{
          widgets[itemIndex].isFull = true;
          widgets[itemIndex].name = widgets[itemIndex].widget2;
          widgets[itemIndex].widget2 = "";
        }        
        this.dashboardService.widgetPositions = widgets;
      }
      itemIndex = widgets.findIndex(widget => widget.widget2 === this.modalName);
      if(itemIndex >= 0)
      {
        widgets[itemIndex].isFull = true;
        widgets[itemIndex].widget2 = "";
      }
    }
    else{
      alert("Cannot remove widget; at least one widget must exist on the page. Please add a second widget before removing this one.");
    }
  }

}
