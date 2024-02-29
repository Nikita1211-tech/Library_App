import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookcategorydetailRoutingModule } from './bookcategorydetail-routing.module';
import { BookcategorydetailComponent } from './bookcategorydetail.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BookcategorydetailComponent
  ],
  imports: [
    CommonModule,
    BookcategorydetailRoutingModule,
    ReactiveFormsModule
  ]
})
export class BookcategorydetailModule { }
