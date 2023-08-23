import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TabViewModule } from 'primeng/tabview';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbdSortableHeader } from '../directives/sortable.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { FooterComponent } from './footer/footer.component';
import { MyCustomersComponent } from './my-customers/my-customers.component';
import { NewsAlertsComponent } from './news-alerts/news-alerts.component';
import { CustomerEventsComponent } from './customer-events/customer-events.component';
import { CustomerIdentityComponent } from './customer-identity/customer-identity.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { CustomerGraphsComponent } from './customer-graphs/customer-graphs.component';
import { WidgetMenuComponent } from './widget-menu/widget-menu.component';
import { ModalComponent } from './_modal/modal.component';
import { CustomerContactsComponent } from './customer-contacts/customer-contacts.component';
import { CustomerSimilarComponent } from './customer-similar/customer-similar.component';
import { CustomerRecommendationsComponent } from './customer-recommendations/customer-recommendations.component';
import { FundingsComponent } from './fundings/fundings.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule, MatDialogModule} from '@angular/material';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { ConversionsComponent } from './conversions/conversions.component';
import { ReportsComponent } from './reports/reports.component';
import { NgxPowerBiModule } from 'ngx-powerbi';
import { FeedbackComponent } from './feedback/feedback.component';
import { InsightsComponent } from './insights/insights.component';





@NgModule({
  declarations: [
    TopNavigationComponent,
    SideNavigationComponent,
    FooterComponent,
    MyCustomersComponent,
    NewsAlertsComponent,
    CustomerEventsComponent,
    CustomerIdentityComponent,
    BarChartComponent,
    //MiserablesComponent,
    CustomerGraphsComponent,
    WidgetMenuComponent,
    ModalComponent,
    NgbdSortableHeader,
    CustomerContactsComponent,
    CustomerSimilarComponent,
    CustomerRecommendationsComponent,
    FundingsComponent,
    ConversionsComponent,
    ReportsComponent,
    FeedbackComponent,
    InsightsComponent,
    
  ],
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    ScrollPanelModule,
    BsDropdownModule.forRoot(),
    TabViewModule,
    TabsModule.forRoot(),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    TooltipModule.forRoot(),
    ProgressbarModule.forRoot(),
    AutocompleteLibModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    RoundProgressModule,
    NgxPowerBiModule,
    
  ],
  providers: [
    DatePipe
  ],
  exports: [
    TopNavigationComponent,
    SideNavigationComponent,
    FooterComponent,
    MyCustomersComponent,
    NewsAlertsComponent,
    CustomerEventsComponent,
    CustomerIdentityComponent,
    CustomerGraphsComponent,
    ModalComponent,
    CustomerContactsComponent,
    CustomerSimilarComponent,
    CustomerRecommendationsComponent,
    FundingsComponent,
    ConversionsComponent
  ]
})
export class SectionsModule { }
