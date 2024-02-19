import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookcategoriesRoutingModule } from './bookcategories-routing.module';
import { BookcategoriesComponent } from './bookcategories.component';


@NgModule({
  declarations: [
    BookcategoriesComponent
  ],
  imports: [
    CommonModule,
    BookcategoriesRoutingModule
  ]
})
export class BookcategoriesModule { }
