import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooktypesRoutingModule } from './booktypes-routing.module';
import { BooktypesComponent } from './booktypes.component';


@NgModule({
  declarations: [
    BooktypesComponent
  ],
  imports: [
    CommonModule,
    BooktypesRoutingModule
  ]
})
export class BooktypesModule { }
