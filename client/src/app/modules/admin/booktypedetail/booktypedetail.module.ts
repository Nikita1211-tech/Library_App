import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooktypedetailRoutingModule } from './booktypedetail-routing.module';
import { BooktypedetailComponent } from './booktypedetail.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BooktypedetailComponent
  ],
  imports: [
    CommonModule,
    BooktypedetailRoutingModule,
    ReactiveFormsModule
  ]
})
export class BooktypedetailModule { }
