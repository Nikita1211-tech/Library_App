import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooktypedetailComponent } from './booktypedetail.component';

const routes: Routes = [{ path: '', component: BooktypedetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooktypedetailRoutingModule { }
