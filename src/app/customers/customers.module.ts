import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SectionsModule} from '../sections/sections.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerComponent } from './customer/customer.component';


@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SectionsModule,
    DragDropModule
  ]
})
export class CustomerModule { }
