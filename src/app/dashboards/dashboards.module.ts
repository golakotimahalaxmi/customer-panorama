import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SectionsModule } from "../sections/sections.module";
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DashboardRoutingModule } from "./dashboards-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LinegraphComponent } from './linegraph/linegraph.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
// import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';



@NgModule({
  declarations: [DashboardComponent, LinegraphComponent, ProfileCardComponent],
  imports: [CommonModule, DashboardRoutingModule, SectionsModule, DragDropModule]
})
export class DashboardModule {}
