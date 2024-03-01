import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddbookRoutingModule } from './addbook-routing.module';
import { AddbookComponent } from './addbook.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddbookComponent
  ],
  imports: [
    CommonModule,
    AddbookRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AddbookModule { }
