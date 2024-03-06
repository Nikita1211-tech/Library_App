import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookcategorydetailRoutingModule } from './bookcategorydetail-routing.module';
import { BookcategorydetailComponent } from './bookcategorydetail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';


@NgModule({
  declarations: [
    BookcategorydetailComponent
  ],
  imports: [
    CommonModule,
    BookcategorydetailRoutingModule,
    ReactiveFormsModule,
    RxReactiveFormsModule
  ]
})
export class BookcategorydetailModule { }
