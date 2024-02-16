import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditbookComponent } from './editbook.component';

const routes: Routes = [{ path: '', component: EditbookComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditbookRoutingModule { }
