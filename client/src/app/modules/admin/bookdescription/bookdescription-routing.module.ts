import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookdescriptionComponent } from './bookdescription.component';

const routes: Routes = [{ path: '', component: BookdescriptionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookdescriptionRoutingModule { }
