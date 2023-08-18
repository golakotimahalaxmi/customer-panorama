import { NgModule } from "@angular/core";
import { Routes, RouterModule, ActivatedRoute } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { AuthGuard } from './guards/auth-guard.guard';
import { SplashComponent } from "./splash/splash.component";
import { ReportsComponent } from "./sections/reports/reports.component";
import { FeedbackComponent } from "./sections/feedback/feedback.component";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./dashboards/dashboards.module").then(m => m.DashboardModule),
      pathMatch:"full",
  },
  { path: "customer", redirectTo: "",pathMatch:"full"},
  {
    path: "customer/:id",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./customers/customers.module").then(m => m.CustomerModule),
    pathMatch:"full",
  },
  {
    path: "splash",
    component: SplashComponent,
    pathMatch:"full",
  },
  {
    path: "reports",
    component: ReportsComponent,
    pathMatch:"full",
  },
  {
    path: "feedback",
    component: FeedbackComponent,
    pathMatch:"full",
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
