import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetpasswordComponent } from './setpassword.component';

const routes: Routes = [{ path: '', component: SetpasswordComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetpasswordRoutingModule { }
