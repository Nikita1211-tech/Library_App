import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetpasswordRoutingModule } from './setpassword-routing.module';
import { SetpasswordComponent } from './setpassword.component';


@NgModule({
  declarations: [
    SetpasswordComponent
  ],
  imports: [
    CommonModule,
    SetpasswordRoutingModule
  ]
})
export class SetpasswordModule { }
