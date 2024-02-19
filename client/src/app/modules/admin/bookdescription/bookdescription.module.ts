import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookdescriptionRoutingModule } from './bookdescription-routing.module';
import { BookdescriptionComponent } from './bookdescription.component';


@NgModule({
  declarations: [
    BookdescriptionComponent
  ],
  imports: [
    CommonModule,
    BookdescriptionRoutingModule
  ]
})
export class BookdescriptionModule { }
