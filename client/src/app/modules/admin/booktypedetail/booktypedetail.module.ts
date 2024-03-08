import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooktypedetailRoutingModule } from './booktypedetail-routing.module';
import { BooktypedetailComponent } from './booktypedetail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    BooktypedetailComponent
  ],
  imports: [
    CommonModule,
    BooktypedetailRoutingModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule
  ]
})
export class BooktypedetailModule { }
