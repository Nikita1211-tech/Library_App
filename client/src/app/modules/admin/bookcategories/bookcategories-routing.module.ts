import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookcategoriesComponent } from './bookcategories.component';

const routes: Routes = [{ path: '', component: BookcategoriesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookcategoriesRoutingModule { }
