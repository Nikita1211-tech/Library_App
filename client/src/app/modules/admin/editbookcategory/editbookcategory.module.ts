import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditbookcategoryRoutingModule } from './editbookcategory-routing.module';
import { EditbookcategoryComponent } from './editbookcategory.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditbookcategoryComponent
  ],
  imports: [
    CommonModule,
    EditbookcategoryRoutingModule,
    ReactiveFormsModule
  ]
})
export class EditbookcategoryModule { }
