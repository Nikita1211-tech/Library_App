import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookcategorydetailComponent } from './bookcategorydetail.component';

const routes: Routes = [{ path: '', component: BookcategorydetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookcategorydetailRoutingModule { }
