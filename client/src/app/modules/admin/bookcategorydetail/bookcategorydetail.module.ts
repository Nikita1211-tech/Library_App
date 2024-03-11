import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookcategorydetailRoutingModule } from './bookcategorydetail-routing.module';
import { BookcategorydetailComponent } from './bookcategorydetail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    BookcategorydetailComponent
  ],
  imports: [
    CommonModule,
    BookcategorydetailRoutingModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    DynamicDialogModule,
    DialogModule,
    ButtonModule
  ]
})
export class BookcategorydetailModule { }
