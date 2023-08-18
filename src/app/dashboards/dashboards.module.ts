import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SectionsModule } from "../sections/sections.module";
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DashboardRoutingModule } from "./dashboards-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, SectionsModule, DragDropModule]
})
export class DashboardModule {}
