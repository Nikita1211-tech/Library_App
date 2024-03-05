import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditbookcategoryComponent } from './editbookcategory.component';

const routes: Routes = [{ path: '', component: EditbookcategoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditbookcategoryRoutingModule { }
