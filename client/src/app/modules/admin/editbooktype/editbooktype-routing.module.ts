import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditbooktypeComponent } from './editbooktype.component';

const routes: Routes = [{ path: '', component: EditbooktypeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditbooktypeRoutingModule { }
