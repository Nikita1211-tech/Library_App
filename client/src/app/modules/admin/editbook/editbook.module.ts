import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditbookRoutingModule } from './editbook-routing.module';
import { EditbookComponent } from './editbook.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditbookComponent
  ],
  imports: [
    CommonModule,
    EditbookRoutingModule,
    ReactiveFormsModule
  ]
})
export class EditbookModule { }
