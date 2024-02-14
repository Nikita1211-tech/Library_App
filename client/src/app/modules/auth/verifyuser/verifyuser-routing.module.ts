import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyuserComponent } from './verifyuser.component';

const routes: Routes = [{ path: '', component: VerifyuserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifyuserRoutingModule { }
