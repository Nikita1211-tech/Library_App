import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookdetailRoutingModule } from './bookdetail-routing.module';
import { BookdetailComponent } from './bookdetail.component';


@NgModule({
  declarations: [
    BookdetailComponent
  ],
  imports: [
    CommonModule,
    BookdetailRoutingModule
  ]
})
export class BookdetailModule { }
