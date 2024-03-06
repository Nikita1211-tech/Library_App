import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditbookcategoryRoutingModule } from './editbookcategory-routing.module';
import { EditbookcategoryComponent } from './editbookcategory.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';


@NgModule({
  declarations: [
    EditbookcategoryComponent
  ],
  imports: [
    CommonModule,
    EditbookcategoryRoutingModule,
    ReactiveFormsModule,
    RxReactiveFormsModule
  ]
})
export class EditbookcategoryModule { }
