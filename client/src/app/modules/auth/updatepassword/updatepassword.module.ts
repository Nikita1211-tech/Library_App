import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatepasswordRoutingModule } from './updatepassword-routing.module';
import { UpdatepasswordComponent } from './updatepassword.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdatepasswordComponent
  ],
  imports: [
    CommonModule,
    UpdatepasswordRoutingModule,
    ReactiveFormsModule
  ]
})
export class UpdatepasswordModule { }
