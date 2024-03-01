import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooktypesComponent } from './booktypes.component';

const routes: Routes = [{ path: '', component: BooktypesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooktypesRoutingModule { }
