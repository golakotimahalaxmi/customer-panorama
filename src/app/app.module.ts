import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard} from './guards/auth-guard.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { SectionsModule } from './sections/sections.module';
import { AuthInterceptor } from './services/auth/auth-interceptor.service'
import { DecimalPipe } from '@angular/common';
import { SplashComponent } from './splash/splash.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ScrollPanelModule,
    HttpClientModule,
    AutocompleteLibModule,
    SectionsModule,
    AutocompleteLibModule,
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
   
  ],
  providers: [
    AuthGuard,
    DecimalPipe,
    /*{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }*/
  ],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent]
})
export class AppModule { }
