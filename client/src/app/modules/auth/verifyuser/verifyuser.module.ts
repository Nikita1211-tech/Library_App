import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyuserRoutingModule } from './verifyuser-routing.module';
import { VerifyuserComponent } from './verifyuser.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VerifyuserComponent
  ],
  imports: [
    CommonModule,
    VerifyuserRoutingModule,
    ReactiveFormsModule
  ]
})
export class VerifyuserModule { }
