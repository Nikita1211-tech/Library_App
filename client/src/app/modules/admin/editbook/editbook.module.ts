import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditbookRoutingModule } from './editbook-routing.module';
import { EditbookComponent } from './editbook.component';


@NgModule({
  declarations: [
    EditbookComponent
  ],
  imports: [
    CommonModule,
    EditbookRoutingModule
  ]
})
export class EditbookModule { }
