import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditbooktypeRoutingModule } from './editbooktype-routing.module';
import { EditbooktypeComponent } from './editbooktype.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditbooktypeComponent
  ],
  imports: [
    CommonModule,
    EditbooktypeRoutingModule,
    ReactiveFormsModule
  ]
})
export class EditbooktypeModule { }
